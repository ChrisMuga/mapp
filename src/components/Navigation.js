import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

// components
import Map from './Map'
import Countries from './Countries'

// css
import '../App.css'

class Navigation extends Component {
  render() {
    return (
        <Router>
            <div>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <a class="navbar-brand" href="#">Navbar</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item">
                                <Link className = "nav-link" to="/countries">Countries</Link>
                            </li>
                            <li className = "nav-item">
                                <Link className = "nav-link" to="/map/">Map</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        
            <Route path="/map" exact component={Map} />
            <Route path="/countries/" component={Countries} />
        </Router>
    )
  }
}

export default Navigation
