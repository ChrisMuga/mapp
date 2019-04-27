import React, { Component } from 'react'
import MapboxMap from 'react-mapbox-wrapper'
import '../App.css'
import Sample from './Sample'

class Map extends Component {
  constructor (props){
    super(props)
    this.state = {
      theme: true
    }
    this.altTheme = this.altTheme.bind(this)
    this.defaultTheme = this.defaultTheme.bind(this)
  }

  componentDidMount(){
    console.log('map component: mounted')
  }

  // functions
  altTheme = () => {this.setState({theme: false})}
  defaultTheme = () => {this.setState({theme: true})}

  // render function
  render() {
    return (
     <div className = "row my-1 justify-content-center" >
        <div className = "col-md-6">
            <h1 className = "text-center">Map</h1>
            <div className = "alert alert-primary b0">
              <h5>This is a map, look. It helps you move around and stuff. No difference with a .JS file really.</h5>
              <Sample/>
            </div>
            <div className = "row my-2 justify-content-center">
              <div className = "col-md-8">
                <div className = "row">
                  <div className = "col-md-6 text-center">
                    <button className = "btn btn-primary full-width b0" onClick = {this.defaultTheme}>Default Map</button>
                  </div>
                  <div className = "col-md-6 text-center">
                    <button className = "btn btn-dark full-width b0" onClick = {this.altTheme}>Alt Map</button>
                  </div>
                </div>
              </div>
            </div>
            <div className = "map">
              <MapboxMap
                accessToken = "pk.eyJ1IjoiY2hyaXN0aWFuOTQiLCJhIjoiY2pyOGtwamlrMDdlcjQ1bDgyY2d2N3YxYyJ9.L88q8kDAaxr61oEG_HIssg"
                coordinates = {{ lng: 36.8219, lat: -1.2921 }}
                withFullscreen = {this.state.theme}
                mapboxStyle = {this.state.theme ? 'mapbox://styles/mapbox/streets-v10' : 'mapbox://styles/mapbox/dark-v10'} 
              />
            </div>
            <br/>
            <div className = {this.state.theme ? "p-2 alert-primary text-right" : "p-2 alert-dark text-right"}>
              <p>This is a map, it helps you move around and stuff...</p>
              <p>{this.state.theme ? 'Light Theme': 'Dark Theme'}</p>
            </div>
        </div>
     </div>
    )
  }
}

export default Map


