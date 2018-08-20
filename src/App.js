import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Results extends Component {
    constructor(props) {
    super(props);
        this.state = {
            submitted: false,
            coord: {},
            sys: {},
            weather: {},
            base: {},
            main: {},
            wind: {},
            clouds: {},
            dt: 0,
            id: 0,
            name: "",
            zipcode: "",
            countryCode: "US",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    convertTemp(input) {
        let temp = 9/5 * (input - 273) + 32;
        return temp.toFixed(2);
    };
    handleSubmit(event) {
        const apiURL = `http://api.openweathermap.org/data/2.5/weather?zip=${this.state.zipcode},${this.state.countryCode}&APPID=${this.props.APPID}`;
        fetch(apiURL)
        .then(results => {
            if (!results.ok) throw Error(results.statusText);
            console.log(results);
            return results.json();
        }).then(data=>{
            this.setState({
                coord: data.coord,
                sys: data.sys,
                weather: data.weather[0],
                base: data.base,
                main: data.main,
                wind: data.wind,
                clouds: data.clouds,
                dt: data.dt,
                id: data.id,
                name: data.name,
            })
        });
        this.setState({submitted: true});
        event.preventDefault();
    }
    handleChange(event) {
        this.setState({zipcode: event.target.value});
    }
    createView() {
        if (!this.state.submitted) {
            return(
                <div class="jumbotron">
                    <h1 class="display-4"> Weather App </h1>
                    <p class="lead"> Please enter a 5 digit US zipcode for weather information </p>
                    <form onSubmit={this.handleSubmit}>
                        <div class="form-group">
                            <input id="zipInput" class="form-control" type= "text" onChange={this.handleChange} placeholder="5-digit zipcode"/>
                            <button class="btn btn-primary" type="submit"> Submit </button>
                        </div>
                    </form>
                </div>
            );
        }
        else {
            return(
                <div class="jumbotron">
                    <h1 class="display-4"> Weather App </h1>
                    <p class="lead"> Please enter a 5 digit US zipcode for weather information </p>
                    <form onSubmit={this.handleSubmit}>
                        <div class="form-group">
                            <input id="zipInput" class="form-control" type= "text" onChange={this.handleChange} placeholder="5-digit zipcode"/>
                            <button class="btn btn-primary" type="submit">Submit </button>
                        </div>
                    </form>
                    <h2> <b> Current weather in {this.state.name}</b> </h2>
                    <h4> <b> Temperature: {this.convertTemp(this.state.main.temp)}F</b></h4>
                    <h4> <b> Temperature range: {this.convertTemp(this.state.main.temp_min)}F - {this.convertTemp(this.state.main.temp_max)}F</b></h4>
                    <h4> <b> Humidity: {this.state.main.humidity}%</b></h4>
                    <h4> <b> Wind: Speed: {(this.state.wind.speed * 0.621371).toFixed(2)} MPH  Direction: {this.state.wind.deg} degrees</b> </h4>
                    <h4> <b> Current Weather: {this.state.weather.description} </b></h4> 
                </div>
            );
        }    
    }
    render() {
    return(
        <div className="Results">
            {this.createView()}
        </div>
    );
  }
}
class App extends Component {
  renderResults(APPID) {
    return <Results APPID={APPID}/>
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Project</h1>
        </header>
        {this.renderResults('8594ec7c3495644ac0871f8cad7717d6')}
      </div>
    );
  }
}

export default App;
