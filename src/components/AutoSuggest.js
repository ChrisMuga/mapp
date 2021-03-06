import React, {Component} from 'react'
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
  <div className = "suggestion bg-light">
    <button className = "btn btn-primary b0">{suggestion.display_name.toUpperCase()}</button>
  </div>
)

class AutoSuggest extends Component {
  constructor() {
    super()

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
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
    console.log('selected')
    console.log(suggestion)
    console.log(suggestionValue)
    this.setState(
      {
        center: [suggestion.lat, suggestion.lon]
      }
    )
  }

  render() {
    const { value, suggestions } = this.state

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Search',
      value,
      onChange: this.onChange
    }

    // Finally, render it!
    return (
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
    )
  }
}

export default AutoSuggest