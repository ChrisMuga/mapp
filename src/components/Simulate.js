import React, {Component} from 'react'
import Autosuggest from 'react-autosuggest'
import '../App.css'
import theme from './Theme.css'

// mapbox stuff
import mapboxgl from 'mapbox-gl'
import Directions from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import 'mapbox-gl/dist/mapbox-gl.css' // Updating node module will keep css up to date.
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css' // Updating node module will keep css up to date.
// mapbox stuff


  function getSuggestionValue(suggestion) {
    return suggestion.display_name
  }


  const renderSuggestion = suggestion => (
    <div className = "suggestion bg-light card card-body mb-2 p-2">
      {suggestion.display_name.toUpperCase()}
    </div>
)
  
  class AutosuggestComponent extends Component {
    constructor() {
      super()
  
      this.state = {
        value: '',
        suggestions: []
      }    
    }
  
    onChange = (_, { newValue }) => {
      const { id, onChange } = this.props
      
      this.setState({
        value: newValue
      })
      
      onChange(id, newValue)
    }
    
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
  
    onSuggestionsClearRequested = () => {
      this.setState({
        suggestions: []
      })
    }

    onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
        let coordinates = [ suggestion.lon,suggestion.lat]
        alert(coordinates)
      }
  
    render() {
      const { id, placeholder } = this.props
      const { value, suggestions } = this.state
      const inputProps = {
        placeholder,
        value,
        onChange: this.onChange
      }
      
      return (
        <Autosuggest 
          id={id}
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          theme={theme} 
          onSuggestionSelected = {this.onSuggestionSelected}
        />
      )
    }
  }
export default class Simulate extends Component{
    constructor(props){
        super(props)
        this.state = {
            center: [36.81667,-1.28333] /*Nairobi */,
            zoom:11,
        }
    }
    onChange(id, newValue) {
        console.log(`${id} changed to ${newValue}`)
      }

      componentDidMount(){
        console.log('driving-component: mounted')
        mapboxgl.accessToken = 'pk.eyJ1IjoiY2hyaXN0aWFuOTQiLCJhIjoiY2pyOGtwamlrMDdlcjQ1bDgyY2d2N3YxYyJ9.L88q8kDAaxr61oEG_HIssg'
       //  create map
        const map = new mapboxgl.Map({
         container  : 'map',
         style      : 'mapbox://styles/mapbox/streets-v9',
         center     : this.state.center,
         zoom       : this.state.zoom
        })
 
       //  directions
       let directions = new Directions({
           accessToken: mapboxgl.accessToken,
           unit: 'metric',
           profile: 'mapbox/driving',
           controls:{
               // inputs: false,
               // instructions: false,
           },
       })
       // - directions
       map.addControl(directions, 'top-left')
       // Add zoom and rotation controls to the map.
       map.addControl(new mapboxgl.NavigationControl())
       console.log(map)
      }
      
      render() {
        return (
          <div className = "row my-2">
            <div className = "col-md-6">
                <h6>Map</h6>
                <div id="map" className = "map"></div>
            </div>
            <div className = "col-md-6">
                <AutosuggestComponent
                    id="from"
                    placeholder="Select Pick-Up"
                    onChange={this.onChange}
                />
                <hr/>
                <AutosuggestComponent
                    id="to"
                    placeholder="Select Destination"
                    onChange={this.onChange}
                />
            </div>
            
          </div>
        )
      }
}