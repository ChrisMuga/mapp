import React, {Component} from 'react'
import ReactMapboxGl from "react-mapbox-gl"
import Autosuggest from 'react-autosuggest'
import fetch from 'node-fetch'
import theme from './Theme.css'
import '../App.css'

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.display_name

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div className = "suggestion">
    <button className = "btn btn-primary b0" 
    // onClick = {this.setState({
    //   center: [suggestion.lon, suggestion.lat]
    // })}
    >{suggestion.display_name}</button>
  </div>
)

class RequestRide extends Component{
constructor(props){
    super(props)
    this.state = {
        // autosuggest
        value: '',
        suggestions: [],

        // mapbox
        center: [36.81667,-1.28333],
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

  onSelect(lat,lon){
    alert(`${lat}, ${lon}`)
    console.log(lat, lon)
  }


render(){

    // auto-suggest stuff
    const { value, suggestions } = this.state

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Search Location/Place',
      value,
      onChange: this.onChange
    }

    // mapbox stuff
    let accessToken = "pk.eyJ1IjoiY2hyaXN0aWFuOTQiLCJhIjoiY2pyOGtwamlrMDdlcjQ1bDgyY2d2N3YxYyJ9.L88q8kDAaxr61oEG_HIssg" 
    const Map = ReactMapboxGl({ accessToken });
    const zoom = [12];
    // const center = [36.81667,-1.28333]
    let mapStyles = {
        streetsV9   : 'mapbox://styles/mapbox/streets-v9',
        darkv9      : 'mapbox://styles/mapbox/dark-v9'
    }
    return (
        <div>
          <div className = "row my-2">
            <div className = "col-md-6">
              <div className = "alert alert-primary b0">
                  <h5>Search Destination</h5>
                  <Autosuggest
                      suggestions                 = {suggestions}
                      onSuggestionsFetchRequested = {this.onSuggestionsFetchRequested}
                      onSuggestionsClearRequested = {this.onSuggestionsClearRequested}
                      getSuggestionValue          = {getSuggestionValue}
                      renderSuggestion            = {renderSuggestion}
                      inputProps                  = {inputProps}
                      theme                       = {theme}
                  />
              </div>
            </div>
          </div>
          <div className = "row my-2">
              <div className = "col-md-6">
                  <Map
                      style           =   {mapStyles.darkv9}
                      zoom            =   {zoom}
                      center          =   {this.state.center}
                      className       =   "map-container"
                  />
              </div>
            </div>

            
            
            </div>

          
    )
}

}

export default RequestRide