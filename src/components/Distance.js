import React, { Component } from 'react'

class Distance extends Component {

    constructor(props){
        super(props)
        // states
        this.state = {

        }

        // bind functions to this
        this.fetchDistanceData = this.fetchDistanceData.bind(this)

    }

    componentDidMount(){
        this.fetchDistanceData()
    }

    // functions
    fetchDistanceData (){
        fetch('https://api.mapbox.com/directions-matrix/v1/mapbox/walking/-122.418563,37.751659;-122.422969,37.75529;-122.426904,37.759617?sources=1&annotations=distance,duration&access_token=pk.eyJ1IjoiY2hyaXN0aWFuOTQiLCJhIjoiY2pyOGtwamlrMDdlcjQ1bDgyY2d2N3YxYyJ9.L88q8kDAaxr61oEG_HIssg')
        .then(response => {
            return response.json();
        })
        .then(myJson => {
            console.log(JSON.stringify(myJson))
            this.setState({distanceData: myJson})
        })
    }
    render() {
        return (
            <div>
            <div className = "alert alert-primary b0" >
                <h1>Mapp</h1>
              
            </div>
            </div>
        )
    }
}

export default Distance
