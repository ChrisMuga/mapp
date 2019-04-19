import React, { Component } from 'react'



class Driving extends Component {


  componentDidMount()
  {
       console.log('driving-component: mounted')
  }
  render() {
    
    return (
     <div>
        <div className = "alert alert-primary b0 my-1">
          <h1>Mapp</h1>
          <div id = "map"></div>
        </div>       
     </div>
    )
  }
  
}

export default Driving
