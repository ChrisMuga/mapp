import React, { Component } from 'react'
import Header from './Header'
import Map from './Map'
import Countries from './Countries'
import Driving from './Driving'
import Navigation from './Navigation'

// css
import '../App.css'

class Main extends Component {
  render() {
    return (
     <div className = "my-2">
        <Navigation/>
        <Header/>
        <div className = "row my-2">
          <div className = "col-md-3">
            <Countries/>
          </div>
          <div className = "col-md-9">
            <Map/>
          </div>
        </div>
        <div className = "row my-2 d-flex justify-content-center">
          <div className = "col-md-8">
            <Driving/>
          </div>
        </div>
     </div>
    )
  }
}

export default Main
