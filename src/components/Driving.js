import React, { Component } from 'react'
import ReactMapboxGl from "react-mapbox-gl"
class Driving extends Component {
  render() {
    const Map = ReactMapboxGl({
        accessToken: "pk.eyJ1IjoiY2hyaXN0aWFuOTQiLCJhIjoiY2pyOGtwamlrMDdlcjQ1bDgyY2d2N3YxYyJ9.L88q8kDAaxr61oEG_HIssg",
        style: 'mapbox://styles/mapbox/streets-v8'
      });
    return (
     <div>
        <div className = "alert alert-primary b0">
            <h1>Mapp</h1>
            <Map 
             
            />
        </div>
     </div>
    )
  }
  
}

export default Driving
