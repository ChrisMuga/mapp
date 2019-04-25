import React, {Component} from 'react'
import ReactMapboxGl from "react-mapbox-gl"
import '../App.css'

class RequestRide extends Component{

render(){
    let accessToken = "pk.eyJ1IjoiY2hyaXN0aWFuOTQiLCJhIjoiY2pyOGtwamlrMDdlcjQ1bDgyY2d2N3YxYyJ9.L88q8kDAaxr61oEG_HIssg" 
    const Map = ReactMapboxGl({ accessToken });
    const zoom = [12];
    const center = [36.81667,-1.28333]
    let mapStyles = {
        streetsV9   : 'mapbox://styles/mapbox/streets-v9',
        darkv9      : 'mapbox://styles/mapbox/dark-v9'
    }
    return (
        <div className = "row my-2">
            <div className = "col-md-6">
                <Map
                    style           =   {mapStyles.darkv9}
                    zoom            =   {zoom}
                    center          =   {center}
                    className       =   "map-container"
                />
            </div>
            <div className = "col-md-6">
                <div className = "alert alert-primary b0">
                    <h1>Hello World?</h1>
                </div>
            </div>
        </div>
    )
}

}

export default RequestRide