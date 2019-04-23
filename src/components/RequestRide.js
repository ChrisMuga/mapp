import React, {Component} from 'react'
import ReactMapboxGl from "react-mapbox-gl"

class RequestRide extends Component{

render(){
    let accessToken = "pk.eyJ1IjoiY2hyaXN0aWFuOTQiLCJhIjoiY2pyOGtwamlrMDdlcjQ1bDgyY2d2N3YxYyJ9.L88q8kDAaxr61oEG_HIssg" 
    const Map = ReactMapboxGl({ accessToken });
    const zoom = [8];
    let mapStyles = {
        streetsV9: 'mapbox://styles/mapbox/streets-v9'
    }
    return (
        <div className = "row my-2">
            <div className = "col-md-6">
                <Map
                style={mapStyles.streetsV9}
                zoom = {zoom}
                containerStyle={{
                    height: "60vh",
                    width: "60vw"
                }}>
                </Map>
            </div>
        </div>
    )
}

}

export default RequestRide