import React, {Component} from 'react'
import fetch from 'node-fetch'

// mapbox stuff
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css' // Updating node module will keep css up to date.
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css' // Updating node module will keep css up to date.
// mapbox stuff

// image - placeholders

import p1 from './p-1.png'
import p2 from './p-2.png'

// image - placeholders



class GenericSimulation extends Component {
    constructor(props){
        super(props)
        this.state= {
            center: [36.81667,-1.28333] /*Nairobi */,
            zoom:11,
            steps: [],
            distance: 0,
            duration: 0,
            coordinates: [],
            geojson : {},
            suggestions_from: [],
            suggestions_to:[],
            origin_name: '',
            destination_name:'',
            from:[],
            to:[],
            origin: '',
            destination: ''
        }
        this.fetchSuggetionsFrom = this.fetchSuggetionsFrom.bind(this)
        this.fetchSuggetionsTo = this.fetchSuggetionsTo.bind(this)
        this.selectOrigin = this.selectOrigin.bind(this)
        this.selectDestination = this.selectDestination.bind(this)
        this.map = this.map.bind(this)
        this.mapA = this.mapA.bind(this)
    }
    componentWillMount(){
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(x => {
            let latitude = x.coords.latitude
            let longitude = x.coords.longitude
            console.log('latitude: ',latitude)
            console.log('longitude: ',longitude)

            this.setState({
                from:[longitude, latitude]
            })
            this.mapA([longitude, latitude])
        })
      } else {
        console.log('geolocation not supported')
      }
    }
    componentDidMount(){
      
    }
    map(from, to){

        mapboxgl.accessToken = 'pk.eyJ1Ijoic3ludGF4bHRkIiwiYSI6ImNqaDJxNnhzbDAwNnMyeHF3dGlqODZsYjcifQ.pcz6BWpzCHeZ6hQg4AH9ww'
        //  create map
        const map = new mapboxgl.Map({
        container  : 'map',
        style      : 'mapbox://styles/syntaxltd/cjtej8ywg042q1fo5en2014kv',
        center     : this.state.center,
        zoom       : this.state.zoom
        })

        // var canvas = map.getCanvasContainer()
        let mode = {
          traffic: 'driving-traffic',
          driving: 'driving',
          cycling: 'cycling'
        }
        let url = `https://api.mapbox.com/directions/v5/mapbox/${mode.driving}/${from[0]},${from[1]};${to[0]},${to[1]}?steps=true&geometries=geojson&access_token=pk.eyJ1IjoiY2hyaXN0aWFuOTQiLCJhIjoiY2pyOGtwamlrMDdlcjQ1bDgyY2d2N3YxYyJ9.L88q8kDAaxr61oEG_HIssg`
        fetch(url)
        .then(data => data.json())
        .then(data => {
            let routes = data.routes
            let coordinates = routes[0].geometry.coordinates
            let steps = data.routes[0].legs[0].steps
            let distance = data.routes[0].distance
            let duration = data.routes[0].duration
            
            // console.log(data)
            // console.log(steps)
            // console.log(coordinates)
            let geojson = {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'LineString',
                  coordinates: coordinates
                }
              }

              this.setState(
                {
                    steps: steps,
                    distance: distance,
                    duration: duration,
                    coordinates: coordinates,
                    geojson: geojson
                }
            )
            
            map.on('load', function() {
                if (map.getSource('route')) {
                    map.getSource('route').setData(geojson);
                  } else { // otherwise, make a new request
                    map.addLayer({
                      id: 'route',
                      type: 'line',
                      source: {
                        type: 'geojson',
                        data: {
                          type: 'Feature',
                          properties: {},
                          geometry: {
                            type: 'LineString',
                            coordinates: coordinates
                          }
                        }
                      },
                      layout: {
                        'line-join': 'round',
                        'line-cap': 'round'
                      },
                      paint: {
                        'line-color': '#3887be',
                        'line-width': 5,
                        'line-opacity': 0.75
                      }
                    });
                  }
                // make an initial directions request that
                // starts and ends at the same location
                map.loadImage(p2, function(error, image) {
                  if (error) throw error;
                  map.addImage("custom-marker", image);
                  /* Style layer: A style layer ties together the source and image and specifies how they are displayed on the map. */
                  map.addLayer({
                    id: "markers",
                    type: "symbol",
                    /* Source: A data source specifies the geographic coordinate where the image marker gets placed. */
                    source: {
                      type: "geojson",
                      data: {
                        type: 'FeatureCollection',
                        features: [
                          {
                          type: 'Feature',
                          properties: {},
                          geometry: {
                          type: "Point",
                          coordinates: from
                          }
                        }
                        ]
                      }
                    },
                    layout: {
                    "icon-image": "custom-marker",
                    }
                    });
                  });

                
                // this is where the code from the next step will go
    

             
                var end = {
                    type: 'FeatureCollection',
                    features: [{
                      type: 'Feature',
                      properties: {},
                      geometry: {
                        type: 'Point',
                        coordinates: to
                      }
                    }
                    ]
                  };
                  if (map.getLayer('end')) {
                    map.getSource('end').setData(end);
                  } else {
                    map.loadImage(p1, function(error, image) {
                      if (error) throw error;
                      map.addImage("custom-marker-1", image);
                      /* Style layer: A style layer ties together the source and image and specifies how they are displayed on the map. */
                      map.addLayer({
                        id: "markers-1",
                        type: "symbol",
                        /* Source: A data source specifies the geographic coordinate where the image marker gets placed. */
                        source: {
                          type: "geojson",
                          data: {
                            type: 'FeatureCollection',
                            features: [
                              {
                              type: 'Feature',
                              properties: {},
                              geometry: {
                              type: "Point",
                              coordinates: to
                              }
                            }
                            ]
                          }
                        },
                        layout: {
                        "icon-image": "custom-marker-1",
                        }
                        });
                      });

                  }

                  // zoom to bounds
                  var bounds = coordinates.reduce(function(bounds, coord) {
                    return bounds.extend(coord);
                    }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));
                     
                    map.fitBounds(bounds, {
                    padding: 20
                    });
                
              });

              
              
              
        })

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
                  suggestions_from: []
              })
          })
      }
  
      selectOrigin = (lat, lon, name) =>{
          this.setState({
              suggestions_from: [],
              origin_name: name,
              origin: `${lat}, ${lon}`,
              from:[lon,lat],
              to:this.state.to
          })
          this.mapA([lon,lat])
      }

      selectDestination = (lat, lon, name) =>{
        this.setState({
            suggestions_to: [],
            destination_name: name,
            destination: `${lat}, ${lon}`,
            to:[lon,lat],
            from: this.state.from
        })

        let from = this.state.from
        let to = [lon, lat]
        // this.map()
        this.map(from, to)
    }

      mapA(from){
        // Add starting point to the map


          mapboxgl.accessToken = 'pk.eyJ1IjoiY2hyaXN0aWFuOTQiLCJhIjoiY2pyOGtwamlrMDdlcjQ1bDgyY2d2N3YxYyJ9.L88q8kDAaxr61oEG_HIssg'
          //  create map
          const map = new mapboxgl.Map({
          container  : 'map',
          style      : 'mapbox://styles/mapbox/streets-v9',
          center     : this.state.center,
          zoom       : this.state.zoom
          })
          map.on('load', function() {
            map.loadImage(p2, function(error, image) {
              if (error) throw error;
              map.addImage("custom-marker", image);
              /* Style layer: A style layer ties together the source and image and specifies how they are displayed on the map. */
              map.addLayer({
                id: "markers",
                type: "symbol",
                /* Source: A data source specifies the geographic coordinate where the image marker gets placed. */
                source: {
                  type: "geojson",
                  data: {
                    type: 'FeatureCollection',
                    features: [
                      {
                      type: 'Feature',
                      properties: {},
                      geometry: {
                      type: "Point",
                      coordinates: from
                      }
                    }
                    ]
                  }
                },
                layout: {
                "icon-image": "custom-marker",
                }
                });
              });
      })

      
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
                  suggestions_to: []
              })
          })
      }
    render(){
        let {steps,distance, duration,suggestions_from, suggestions_to, origin_name, destination_name,destination, from, to, origin} = this.state
        return (
            <div className = "row my-1">
                
                <div className = "col-md-4">
                    {/* search */}
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
                    <button className = "btn btn-success b0 form-control my-2" onClick={() =>{this.map(from, to)}}>Enter</button>
                    {/* search */}
                    {/* instructions/details */}
                    <div className = "alert alert-info b0">Generic Simulation</div>
                    <div className = "alert alert-dark b0 details">
                        Distance: {distance} meters / {distance/1000} kilometers
                        <hr/>
                        Duration: {duration} seconds / {duration/60} minutes / {duration/3600} hrs</div>
                    <div id = "instructions">
                    <div className = "alert alert-primary b0 text-right">
                        <h4>Instructions</h4>
                        <hr/>
                        <small>Directions</small>
                    </div>
                        {
                            steps.map((step,key) => (
                                <div className = "alert alert-warning b0" key = {key}><small>{key+1}. </small><small>{step.maneuver.instruction}</small></div>
                            ))
                        }
                    </div>
                    {/* instructions/details */}
                </div> 
                {/* map */}
                <div className = "col-md-8">
                    <div id ="map" className ="map"></div>
                </div>
                {/* map */}
            </div>
        )
    }
}

export default GenericSimulation