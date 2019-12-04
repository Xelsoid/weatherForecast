import React from 'react';
import './App.css';
import ForecastTable from './ForecastTable';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      weatherData: null,
      city: null,
    };
    this.getWeatherForecastForCity = this.getWeatherForecastForCity.bind(this);
  }

  getCitySearchInputValue() {
    return document.getElementById('searchInput');
  }

  getWeatherForecastForCity() {
    const city = this.getCitySearchInputValue().value;

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=4f4b3160aa3de4b2694f8fed4974f97c`)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then(data => this.setState({ weatherData: data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="container mt-4 mb-3">
            <div className="row">
              <div className="col-md">
                <h1>Weather Forecast</h1>
              </div>
              <div className="col-md mt-2">
                <div className="input-group mb-3">
                  <label className="input-group-prepend mb-0" htmlFor="searchInput">
                    <span className="input-group-text">Your city</span>
                  </label>
                  <input type="text" className="form-control" id="searchInput" placeholder="Weather in ..." />
                  <div className="input-group-append">
                    <button className="btn btn-outline-secondary text-light" type="button" onClick={this.getWeatherForecastForCity}>Check</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <main>
          <div className="container-fluid pr-4 pl-4 mt-4 mb-3">
            <div className="row">
              <h2>{this.state.weatherData ? `Weather in ${this.state.weatherData.city.name}` : 'Not found. Looks like you entered wrong city name.'}</h2>
            </div>
            <div className="row overflow-auto">
              <ForecastTable weatherData={this.state.weatherData} />
            </div>
          </div>
        </main>
        <footer />
      </div>
    );
  }
}

export default App;
