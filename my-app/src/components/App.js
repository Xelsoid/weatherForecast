import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ForecastTable from './ForecastTable';
import localizationUk from '../mockedData/localization.uk';
import localizationRu from '../mockedData/localization.ru';
import { addWeatherData } from '../actions';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      weatherData: null,
      searchInputData: null,
      isLocalizationRu: true,
      localization: this.isLocalizationRu ? localizationRu : localizationUk,
    };
    this.getWeatherForecastForCity = this.getWeatherForecastForCity.bind(this);
    this.getWeatherForecastForCityByEnterKey = this.getWeatherForecastForCityByEnterKey.bind(this);
    this.putSearchInputToState = this.putSearchInputToState.bind(this);
    this.changeLocalization = this.changeLocalization.bind(this);
  }

  getWeatherForecastForCityByEnterKey(e) {
    if (e.keyCode === 13) {
      this.getWeatherForecastForCity();
    }
  }

  getWeatherForecastForCity() {
    const { searchInputData } = this.state;
    const { addWeatherData } = this.props;

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${searchInputData}&APPID=4f4b3160aa3de4b2694f8fed4974f97c`)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then(data => addWeatherData(data))
      .catch(err => console.log(err));
  }

  putSearchInputToState(e) {
    this.setState({
      searchInputData: e.target.value,
    });
  }

  changeLocalization() {
    this.setState({
      isLocalizationRu: !this.state.isLocalizationRu,
    });
    this.setState({
      localization: this.state.isLocalizationRu ? localizationRu : localizationUk,
    });
  }

  render() {
    const { weatherData } = this.props;
    const { localization, isLocalizationRu } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <div className="container mt-4 mb-3">
            <div className="row">
              <div className="col-md">
                <h1>{localization.header.mainTitle}</h1>
              </div>
              <div className="col-md mt-2">
                <div className="input-group mb-3">
                  <label className="input-group-prepend mb-0" htmlFor="searchInput">
                    <span className="input-group-text">{localization.header.citySearch.city}</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={localization.header.citySearch.inputPH}
                    onChange={this.putSearchInputToState}
                    onKeyUp={this.getWeatherForecastForCityByEnterKey}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-secondary text-light"
                      type="button"
                      onClick={this.getWeatherForecastForCity}
                    >
                      {localization.header.citySearch.searchBtn}
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-outline-secondary text-light"
                  onClick={this.changeLocalization}
                >
                  {isLocalizationRu ? 'RU' : 'UK'}
                </button>
              </div>
            </div>
          </div>
        </header>
        <main>
          <div className="container-fluid pr-4 pl-4 mt-4 mb-3">
            <div className="row">
              <h2>{weatherData ? `Weather in ${weatherData.city.name}` : 'Not found. Looks like you entered wrong city name.'}</h2>
            </div>
            <div className="row overflow-auto">
              <ForecastTable weatherData={weatherData} isLocalizationRu={isLocalizationRu} />
            </div>
          </div>
        </main>
        <footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    weatherData: state.weatherData,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ addWeatherData }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(App);
