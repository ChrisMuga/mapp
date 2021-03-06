import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

// components
import Map from './Map'
import Countries from './Countries'
import Driving from './Driving'
import RequestRide from './RequestRide'
import AutoSuggest from './AutoSuggest'

// css
import '../App.css'
import map from './map.png'
import Simulate from './Simulate';
import SimpleSimulation from './SimpleSimulation';
import GenericSimulation from './GenericSimulation';

class Navigation extends Component {
  render() {
    return (
        <Router>
            <div>
                <nav className = "navbar navbar-expand-lg navbar-light bg-light">
                    <Link className = "navbar-brand" to="/"><img src = {map} alt = "Mapp" /></Link>
                    <button className = "navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className = "navbar-toggler-icon"></span>
                    </button>
                    <div className = "collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className = "navbar-nav mr-auto">
                            <li className = "nav-item">
                                <Link className = "nav-link" to="/countries">Countries</Link>
                            </li>
                            <li className = "nav-item">
                                <Link className = "nav-link" to="/map">Map</Link>
                            </li>
                            <li className = "nav-item">
                                <Link className = "nav-link" to="/driving">Driving</Link>
                            </li>
                            <li className = "nav-item">
                                <Link className = "nav-link" to="/request-ride">Request Ride</Link>
                            </li>
                            <li className = "nav-item">
                                <Link className = "nav-link" to="/auto-suggest">Auto Suggest</Link>
                            </li>
                            <li className = "nav-item">
                                <Link className = "nav-link" to="/simulate">Simulate</Link>
                            </li>
                            <li className = "nav-item">
                                <Link className = "nav-link" to="/simple-simulation">Simple Simulation</Link>
                            </li>
                            <li className = "nav-item">
                                <Link className = "nav-link" to="/generic-simulation">Generic Simulation</Link>
                            </li>

                        </ul>
                    </div>
                </nav>
            </div>
        
            <Route path="/map" exact component={Map} />
            <Route path="/countries/" component={Countries} />
            <Route path="/driving" component={Driving} />
            <Route path="/request-ride" component={RequestRide} />
            <Route path="/auto-suggest" component={AutoSuggest} />
            <Route path="/simulate" component={Simulate} />
            <Route path="/simple-simulation" component={SimpleSimulation} />
            <Route path="/generic-simulation" component={GenericSimulation} />

        </Router>
    )
  }
}

export default Navigation
