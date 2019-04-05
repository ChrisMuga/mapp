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
                <nav>
                    <ul>
                        <li>
                            <Link to="/countries">Countries</Link>
                        </li>
                        <li>
                            <Link to="/map/">Map</Link>
                        </li>
                    </ul>
                </nav>
        
                <Route path="/map" exact component={Map} />
                <Route path="/countries/" component={Countries} />
            </div>
        </Router>
    )
  }
}

export default Navigation
