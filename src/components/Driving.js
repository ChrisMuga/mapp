import React, { Component } from 'react'

// mapbox stuff
import mapboxgl from 'mapbox-gl';
import Directions from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import 'mapbox-gl/dist/mapbox-gl.css' // Updating node module will keep css up to date.
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css' // Updating node module will keep css up to date.
// mapbox stuff

// autosuggest stuff
import Autosuggest from 'react-autosuggest'
// autosuggest stuff

import fetch from 'node-fetch'


import '../App.css'
import theme from './Theme.css'

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.display_name

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div className = "suggestion bg-light">
    <button className = "btn btn-primary b0">{suggestion.display_name.toUpperCase()}</button>
  </div>
)


class Driving extends Component {
  constructor(props){
    super(props)
    this.state ={
      center: [36.81667,-1.28333] /*Nairobi */,
      zoom:13,
      value: '',
      suggestions: []
    }
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    })
  }

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    let query = value
    let url = `https://nominatim.openstreetmap.org/search?q=${query}&addressdetails=1&format=json&countrycodes=ke`
    fetch(url)
    .then(data => data.json())
    .then(data => {
        this.setState({
            suggestions: (data)
          })
    })
    .catch(()=>{
        this.setState({
            suggestions: 'No Results'
        })
    })
    
  }

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    })
  }

  onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    // console.log('selected')
    // console.log(suggestion)
    // console.log(suggestionValue)
    let coordinates = [ suggestion.lon,suggestion.lat]
    console.log(coordinates)
    this.setState(
      {
        center: coordinates
      }
    )
  }

  componentDidMount()
  {
       console.log('driving-component: mounted')
       mapboxgl.accessToken = 'pk.eyJ1IjoiY2hyaXN0aWFuOTQiLCJhIjoiY2pyOGtwamlrMDdlcjQ1bDgyY2d2N3YxYyJ9.L88q8kDAaxr61oEG_HIssg';
      //  create map
       const map = new mapboxgl.Map({
        container  : 'map',
        style      : 'mapbox://styles/mapbox/streets-v9',
        center     : this.state.center,
        zoom       : this.state.zoom
       });

      //  directions
      let directions = new Directions({
          accessToken: mapboxgl.accessToken
      })
      directions.setOrigin(this.state.center);
      // directions.setDestination([p2a[1],p2a[0]])
      //- directions
      map.addControl(directions, 'top-left');
       console.log(map)
  }
  render() {

    const { value, suggestions } = this.state

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Search',
      value,
      onChange: this.onChange
    }
    
    return (
     <div>
        <div className = "alert alert-warning text-right b0 my-1">
          <h1>Driving</h1>
        </div>
        <div className = "row my-3">
          {/* map */}
          <div className = "col-md-6">
            <div id = "map" className = "map"></div>  
          </div>
          {/* input */}
          <div className = "col-md-6">
            <input className = "form-control b0" placeholder = "SEARCH"/>
            <Autosuggest
              suggestions                 = {suggestions}
              onSuggestionsFetchRequested = {this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested = {this.onSuggestionsClearRequested}
              getSuggestionValue          = {getSuggestionValue}
              renderSuggestion            = {renderSuggestion}
              inputProps                  = {inputProps}
              theme                       = {theme}
              onSuggestionSelected        = {this.onSuggestionSelected}
            />
          </div>
        </div>
           
     </div>
    )

    
  
  }
  
}


export default Driving
