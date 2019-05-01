import React, {Component} from 'react'
import fetch from 'node-fetch'

// mapbox stuff
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css' // Updating node module will keep css up to date.
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css' // Updating node module will keep css up to date.
// mapbox stuff



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
            geojson : {}
        }
    }
    componentWillMount(){
        
    }
    componentDidMount(){
        this.map()
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

        // var canvas = map.getCanvasContainer()

        let url = 'https://api.mapbox.com/directions/v5/mapbox/cycling/36.8780092,-1.2785311;36.8232411822519,-1.28881625?steps=true&geometries=geojson&access_token=pk.eyJ1IjoiY2hyaXN0aWFuOTQiLCJhIjoiY2pyOGtwamlrMDdlcjQ1bDgyY2d2N3YxYyJ9.L88q8kDAaxr61oEG_HIssg'
        fetch(url)
        .then(data => data.json())
        .then(data => {
            let routes = data.routes
            let coordinates = routes[0].geometry.coordinates
            let steps = data.routes[0].legs[0].steps
            let distance = data.routes[0].distance
            let duration = data.routes[0].duration
            
            console.log(data)
            console.log(steps)
            console.log(coordinates)
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
                    map.getSource('route').setData(this.state.geojson);
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
                            coordinates: geojson
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
           
                // Add starting point to the map
                map.addLayer({
                  id: 'point',
                  type: 'circle',
                  source: {
                    type: 'geojson',
                    data: {
                      type: 'FeatureCollection',
                      features: [{
                        type: 'Feature',
                        properties: {},
                        geometry: {
                          type: 'Point',
                          coordinates: [36.8780092, -1.2785311]
                        }
                      }
                      ]
                    }
                  },
                  paint: {
                    'circle-radius': 10,
                    'circle-color': '#3887be'
                  }
                });
                // this is where the code from the next step will go
    
                var end = {
                    type: 'FeatureCollection',
                    features: [{
                      type: 'Feature',
                      properties: {},
                      geometry: {
                        type: 'Point',
                        coordinates: [36.8232411822519, -1.28881625]
                      }
                    }
                    ]
                  };
                  if (map.getLayer('end')) {
                    map.getSource('end').setData(end);
                  } else {
                    map.addLayer({
                      id: 'end',
                      type: 'circle',
                      source: {
                        type: 'geojson',
                        data: {
                          type: 'FeatureCollection',
                          features: [{
                            type: 'Feature',
                            properties: {},
                            geometry: {
                              type: 'Point',
                              coordinates: [36.8232411822519,-1.28881625]
                            }
                          }]
                        }
                      },
                      paint: {
                        'circle-radius': 10,
                        'circle-color': '#f30'
                      }
                    });
                  }
              });
              
              
        })

        
        
    }
    render(){
        let {steps,distance, duration} = this.state
        return (
            <div className = "row my-1">
                <div className = "col-md-4">
                    <div className = "alert alert-info b0">Generic Simulation</div>
                    <div className = "alert alert-dark b0">
                        Distance: {distance} meters
                        <hr/>
                        Duration: {duration} seconds</div>
                    <div>
                        {
                            steps.map((step,key) => (
                                <div className = "alert alert-warning b0" key = {key}>{step.maneuver.instruction}</div>
                            ))
                        }
                    </div>
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