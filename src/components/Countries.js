import React, { Component } from 'react'

class Countries extends Component {

    constructor(props){
        super(props)
        // states
        this.state = {
            countries: []
        }

        // bind functions to this
        this.fetchCountriesData = this.fetchCountriesData.bind(this)

    }

    componentDidMount(){
        this.fetchCountriesData()
    }

    // functions
    fetchCountriesData (){
        fetch('https://restcountries.eu/rest/v2/all')
        .then(response => {
            return response.json()
        })
        .then(data => {
            this.setState({
                countries: data
            })
        })
    }
    render() {
        const {countries} = this.state
        return (
            <div>
                <div className = "alert alert-dark b0 scroll">
                    <h1 className = "text-right">Countries [{countries.length}]</h1>
                    {
                        countries.map(country => (
                            <div key = {country.alpha2Code}>
                                <div className = "d-flex justify-content-between">
                                    <h4 className = "float-left text-left">{country.name}</h4>
                                    <img src={country.flag} alt = "Flag" className = "flag float-right text-right"/>
                                </div>
                                <p><b>Capital: </b>{country.capital}</p>
                                <hr/>                             
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default Countries
