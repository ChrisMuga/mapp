import React, {Component} from 'react'
import fetch from 'node-fetch'
// import alertify from 'alertifyjs'
import '../App.css'

// mapbox stuff
import mapboxgl from 'mapbox-gl'
import Directions from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import 'mapbox-gl/dist/mapbox-gl.css' // Updating node module will keep css up to date.
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css' // Updating node module will keep css up to date.
// mapbox stuff

export default class SimpleSimulation extends Component{
    constructor(props){
        super(props)
        this.state = {
            suggestions_from: [],
            suggestions_to:[],
            origin_name: '',
            destination_name:'',
            origin: null,
            destination: null,
            center: [36.81667,-1.28333] /*Nairobi */,
            zoom:11,
            from:[],
            to:[],
            distance: null,
            duration: null,
        }
        this.fetchSuggetionsFrom = this.fetchSuggetionsFrom.bind(this)
        this.fetchSuggetionsTo = this.fetchSuggetionsTo.bind(this)
        this.selectOrigin = this.selectOrigin.bind(this)
        this.selectDestination = this.selectDestination.bind(this)
        this.map = this.map.bind(this)
        this.plot = this.plot.bind(this)
    }

    fetchSuggetionsFrom(e)
    {
        let query = (e.target.value)
        let url = `https://nominatim.openstreetmap.org/search?q=${query}&addressdetails=1&format=json&countrycodes=ke`
        fetch(url)
        .then(data => data.json())
        .then(data => {
            let x = data.map(place => {
                return {
                        name: place.display_name,
                        latitude: place.lat,
                        longitude: place.lon,
                        placeid:place.place_id
                    }
            })
            this.setState(
                {
                    suggestions_from: x
                }
            )
            
        })
        .catch(()=>{
            this.setState({
                suggestions_from: 'No Results'
            })
        })
    }

    selectOrigin = (lat, lon, name) =>{
        this.setState({
            suggestions_from: [],
            origin_name: name,
            origin: `${lat}, ${lon}`,
            from:[lon,lat]
        })
        this.map()
    }

    selectDestination = (lat, lon, name) =>{
        this.setState({
            suggestions_to: [],
            destination_name: name,
            destination: `${lat}, ${lon}`,
            to:[lon,lat]
        })
        this.map()
    }

    fetchSuggetionsTo(e)
    {
        let query = (e.target.value)
        let url = `https://nominatim.openstreetmap.org/search?q=${query}&addressdetails=1&format=json&countrycodes=ke`
        fetch(url)
        .then(data => data.json())
        .then(data => {
            
            
            let x = data.map(place => {
                return {
                        name: place.display_name,
                        latitude: place.lat,
                        longitude: place.lon,
                        placeid: place.place_id
                    }
            })
            // console.log(x)
            this.setState(
                {
                    suggestions_to: x
                }
            )
            
        })
        .catch(()=>{
            this.setState({
                suggestions_to: 'No Results'
            })
        })
    }
    map(){
        mapboxgl.accessToken = 'pk.eyJ1IjoiY2hyaXN0aWFuOTQiLCJhIjoiY2pyOGtwamlrMDdlcjQ1bDgyY2d2N3YxYyJ9.L88q8kDAaxr61oEG_HIssg'
      //  create map
       const map = new mapboxgl.Map({
        container  : 'map',
        style      : 'mapbox://styles/mapbox/streets-v9',
        center     : this.state.center,
        zoom       : this.state.zoom
       })

      //  directions
      let directions = new Directions({
        accessToken: mapboxgl.accessToken,
        unit: 'metric',
        profile: 'mapbox/driving-traffic',
        controls:{
            inputs: true,
            instructions: true,
        },
    })
    if(this.state.from !== [])
    {
        directions.setOrigin(this.state.from)
    }
    if(this.state.to !== [])
    {
        directions.setDestination(this.state.to)
    }

    directions.on("route", e => {
        let routes = e.route
        let distance = routes.map(r => r.distance)
        let duration = routes.map(r => r.duration)
        distance = distance[0]
        duration = duration[0]
        this.setState(
            {
                distance: distance,
                duration: duration
            }
        )
    })
    
    // - directions
    map.addControl(directions, 'top-left')
    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl())
    console.log(map)
    
    }
    plot(from, to){
        if(from && to)
        {
        var url = 'https://api.mapbox.com/directions/v5/mapbox/cycling/' + from[0] + ',' + from[1] + ';' + to[0] + ',' + to[1] + '?steps=true&geometries=geojson&access_token=' + mapboxgl.accessToken;
        fetch(url)
        .then(data => data.json())
        .then(data => {
            console.log('start')
            console.log(data)
            console.log('end')
        })
        }
    }
    componentDidMount(){
        this.map()
    }
    render(){
        var {suggestions_from, suggestions_to, origin_name, destination_name, origin, destination, distance, duration } = this.state
        return(
            <div className = "row my-2">
                {/* search */}
                <div className = "col-md-4">
                    <div className = "alert alert-primary b0 my-1"><small>{origin_name}/{origin}</small></div>
                    <input className = "form-control b0" placeholder = "SEARCH ORIGIN" onChange = {this.fetchSuggetionsFrom}/>
                    <div className = "suggestions">
                        {suggestions_from.map(place => (
                            <div className = "card card-body suggestion mb-2 pr-2" key = {place.placeid} onClick = {()=>this.selectOrigin(place.latitude, place.longitude, place.name)}>{place.name}</div>
                        ))}
                    </div>
                    <div className = "alert alert-primary b0 my-1"><small>{destination_name}/{destination}</small></div>
                    <input className = "form-control b0" placeholder = "SEARCH DESTINATION" onChange = {this.fetchSuggetionsTo}/>
                    <div className = "suggestions">
                        {suggestions_to.map(place => (
                            <div className = "card card-body suggestion mb-2 pr-2" key = {place.placeid} onClick = {()=>this.selectDestination(place.latitude, place.longitude, place.name)}>{place.name}</div>
                        ))}
                    </div>
                </div>
                {/* search */}

                {/* map */}
                <div className ="col-md-8">
                    <div className = "alert alert-success b0 my-1"><small>Map</small> | <small>{distance} meters</small>| <small>{duration} seconds</small></div>
                    <div id = "map" className = "map"></div>  
                </div>
                {/* map */}
            </div>
        )
    }
}