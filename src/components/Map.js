import React, { Component } from 'react'
import MapboxMap from 'react-mapbox-wrapper'
import '../App.css'

class Map extends Component {

  componentDidMount(){

  }

  render() {
    return (
     <div className = "row my-1 justify-content-center">
        <div className = "col-md-8">
            <h1 className = "text-center">Map</h1>
            <div className = "alert alert-primary b0">
              <h4>This is a map, look. It helps you move around and stuff.</h4>
            </div>
            <div className = "map">
              <MapboxMap
                accessToken="pk.eyJ1IjoiY2hyaXN0aWFuOTQiLCJhIjoiY2pyOGtwamlrMDdlcjQ1bDgyY2d2N3YxYyJ9.L88q8kDAaxr61oEG_HIssg"
                coordinates={{ lng: 36.8219, lat: -1.2921 }}
                // withFullscreen = "true"
              />
            </div>
            <div className = "alert alert-info b0 my-2 text-right">
              <p>This is a map, it helps you move around and stuff...</p>
            </div>
        </div>
     </div>
    )
  }
}

export default Map


