import React, { Component } from 'react'

class Countries extends Component {

    constructor(props){
        super(props)
        // states
        this.state = {
            countries: [],
            loading: null,
        }

        // bind functions to this
        this.fetchCountriesData = this.fetchCountriesData.bind(this)

    }

    componentDidMount(){
        console.log('countries-component: mounted')
        this.fetchCountriesData()
        this.setState({
            loading: false
        })
    }
    componentWillMount(){
        console.log('waiting for component to mount')
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
        if(countries.length === 0){
            return(
                <div className = "row d-flex justify-content-center">
                    <div className = "col-md-4 text-center mid-level">
                        <h1>LOADING</h1>
                        <hr/>
                        <h2>
                            <i className="fas fa-spinner fa-spin"></i>
                        </h2>      
                    </div>  
                </div>   
            )
        }else
        {
        return (
            <div className = "row d-flex justify-content-center">
                <div className = "col-md-6 alert alert-light b0 scroll">
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
                                <div className = "full-width text-center">
                                    <button className="btn btn-danger btn-small b0" type="button" data-toggle="collapse" data-target={"#collapseExample"+i} aria-expanded="false" aria-controls="collapseExample">
                                        Translations
                                    </button>
                                </div>
                                <div className="collapse b0 my-2" id={"collapseExample"+i}>
                                    <div className="card card-body b0">
                                        <ul className="list-group">
                                            <li className="list-group-item"><b className = "text-success">DE</b> - {country.translations.de}</li>
                                            <li className="list-group-item"><b className = "text-success">ES</b> - {country.translations.es}</li>
                                            <li className="list-group-item"><b className = "text-success">FR</b> - {country.translations.fr}</li>
                                            <li className="list-group-item"><b className = "text-success">JA</b> - {country.translations.ja}</li>
                                            <li className="list-group-item"><b className = "text-success">IT</b> - {country.translations.it}</li>
                                            <li className="list-group-item"><b className = "text-success">BR</b> - {country.translations.br}</li>
                                            <li className="list-group-item"><b className = "text-success">PT</b> - {country.translations.pt}</li>
                                            <li className="list-group-item"><b className = "text-success">NL</b> - {country.translations.nl}</li>
                                            <li className="list-group-item"><b className = "text-success">HR</b> - {country.translations.hr}</li>
                                            <li className="list-group-item"><b className = "text-success">FA</b> - {country.translations.fa}</li>
                                        </ul>
                                    </div>
                                </div>
                                <hr/>                             
                            </div>
                        )
                        
                    )
                    }
                </div>
            </div>

        )
                }
    }
}

export default Countries
