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
                <div className = "alert alert-light b0 scroll">
                    <h1 className = "text-right">Countries [{countries.length}]</h1>
                    {
                       
                        countries.map((country,i) => (
                           
                            <div key = {country.alpha2Code}>
                                <div className = "d-flex justify-content-between">
                                    <span className = "badge badge-primary b0"><h4 className = "float-left text-left">{country.name}</h4></span>
                                    <img src={country.flag} alt = "Flag" className = "flag float-right text-right"/>
                                </div>
                                <p><b>Capital: </b>{country.capital}</p>
                                <br/>
                                <button className="btn btn-danger btn-small b0 full-width" type="button" data-toggle="collapse" data-target={"#collapseExample"+i} aria-expanded="false" aria-controls="collapseExample">
                                    Translations
                                </button>
                                <div className="collapse b0 my-2" id={"collapseExample"+i}>
                                    <div className="card card-body b0">
                                        <ul class="list-group">
                                            <li class="list-group-item"><b className = "text-success">DE</b> - {country.translations.de}</li>
                                            <li class="list-group-item"><b className = "text-success">ES</b> - {country.translations.es}</li>
                                            <li class="list-group-item"><b className = "text-success">FR</b> - {country.translations.fr}</li>
                                            <li class="list-group-item"><b className = "text-success">JA</b> - {country.translations.ja}</li>
                                            <li class="list-group-item"><b className = "text-success">IT</b> - {country.translations.it}</li>
                                            <li class="list-group-item"><b className = "text-success">BR</b> - {country.translations.br}</li>
                                            <li class="list-group-item"><b className = "text-success">PT</b> - {country.translations.pt}</li>
                                            <li class="list-group-item"><b className = "text-success">NL</b> - {country.translations.nl}</li>
                                            <li class="list-group-item"><b className = "text-success">HR</b> - {country.translations.hr}</li>
                                            <li class="list-group-item"><b className = "text-success">FA</b> - {country.translations.fa}</li>
                                        </ul>
                                    </div>
                                </div>
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
