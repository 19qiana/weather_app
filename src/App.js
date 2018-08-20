import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Results extends Component {
    constructor(props) {
    super(props);
        this.state = {
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
            zipcode: "02459",
            countryCode: "US",
        };
    }
    convertTemp(input) {
        return 9/5 * (input - 273) + 32;
    };
    createView() {
        return (
            <div class="jumbotron">
                <h1 class="display-4"> Welcome to Weather App! </h1>
                <p class="lead"> This is a simple weather app personalized for Adam Qian </p>
                <hr class="my-4"/>
                <p> It is completely built off of React and is my pet project for experimenting with react </p>
                <p> Current weather in Newton Massachusetts:</p>
                <h4> <b> Temperature: {this.convertTemp(this.state.main.temp)}F</b></h4>
                <h4> <b> Temperature range: {this.convertTemp(this.state.main.temp_min)}F - {this.convertTemp(this.state.main.temp_max)}F</b></h4>
                <h4> <b> Humidity: {this.state.main.humidity}%</b></h4>
                <h4> <b> Wind: Speed: {this.state.wind.speed * 0.621371} MPH  Direction: {this.state.wind.deg} degrees</b> </h4>
                <h4> <b> Current Weather: {this.state.weather.description} </b></h4>
            </div>
        );
    }
    componentDidMount() {
        const apiURL = `http://api.openweathermap.org/data/2.5/weather?zip=${this.state.zipcode},${this.state.countryCode}&APPID=${this.props.APPID}`;
        console.log(apiURL);
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
    }
    render() {
    return(
        <div className="Results">
            <p> This is the results section </p>
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
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {this.renderResults('8594ec7c3495644ac0871f8cad7717d6')}
      </div>
    );
  }
}

export default App;
