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
    componentDidMount() {
        const apiURL = `api.openweathermap.org/data/2.5/weather?zip=${this.state.zipcode},${this.state.countryCode}&APPID=${this.props.APPID}`;
        console.log(apiURL);
        fetch(apiURL)
        .then(results => {
            // if (!results.ok) throw Error(results.statusText);
            console.log(results);
            return results.json();
        }).then(data=>{
            this.setState({
                coord: data.coord,
                sys: data.sys,
                weather: data.weather,
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
            {this.state.main.temp}
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
