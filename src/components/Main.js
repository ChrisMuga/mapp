import React, { Component } from 'react'
import Header from './Header'
import Map from './Map'
import Countries from './Countries'

// css
import '../App.css'

class Main extends Component {
  render() {
    return (
     <div className = "my-2">
        <Header/>
        <Map/>
        <div className = "row my-2">
          <div className = "col-md-4">
            <Countries/>
          </div>
        </div>
     </div>
    )
  }
}

export default Main
