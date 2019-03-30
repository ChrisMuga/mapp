import React, { Component } from 'react'
import Header from './Header'
import Map from './Map'

// css
import '../App.css'

class Main extends Component {
  render() {
    return (
     <div className = "my-2">
        <Header/>
        <Map/>
     </div>
    )
  }
}

export default Main
