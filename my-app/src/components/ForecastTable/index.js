import React from 'react';
import './index.css';
import ForecastTableCell from './ForecastTableCell';
import localizationUk from '../../mockedData/localization.uk';
import localizationRu from '../../mockedData/localization.ru';

class ForecastTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      localization: props.isLocalizationRu ? localizationRu : localizationUk,
    };
  }

  getFormattedDate(date) {
    return new Date(date);
  }

  render() {
    const { weatherData } = this.props;
    console.log(weatherData);
    if (!weatherData || !weatherData.list) { return null; }

    const { localization } = this.state;
    return (
      <table className="table table-sm forecast-table">
        <thead>
          <tr>
            <th>{localization.main.weatherTable.day}</th>
            {weatherData.list.map((elem) => {
              const formattedDate = this.getFormattedDate(elem.dt_txt);
              const cellData = `${formattedDate.getDate()}/${formattedDate.getMonth() + 1}`;
              return <ForecastTableCell key={elem.dt} cellData={cellData} />;
            })}
          </tr>
          <tr>
            <th>{localization.main.weatherTable.time}</th>
            {weatherData.list.map((elem) => {
              const formattedDate = this.getFormattedDate(elem.dt_txt);
              const cellData = `${formattedDate.getHours()}`;
              return <ForecastTableCell key={elem.dt} cellData={cellData} />;
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">{localization.main.weatherTable.cloudness}</th>
            {weatherData.list.map(elem => (
              <ForecastTableCell key={elem.dt} cellData={elem.clouds.all} />
            ))}
          </tr>
          <tr>
            <th scope="row">Picture:</th>
            {weatherData.list.map((elem) => {
              const currentUrl = `http://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png`;
              return (
                <ForecastTableCell
                  key={elem.dt}
                  cellData={[<img
                    key={elem.dt}
                    alt={`${elem.clouds.all} %`}
                    title={`${elem.clouds.all} %`}
                    className="weather-picture"
                    src={currentUrl}
                  />]}
                />
              );
            })}
          </tr>

          <tr>
            <th scope="row">{localization.main.weatherTable.weather}</th>
            {weatherData.list.map(elem => (
              <ForecastTableCell key={elem.dt} cellData={elem.weather[0].description} />
            ))}
          </tr>
          <tr>
            <th scope="row">{localization.main.weatherTable.temp}</th>
            {weatherData.list.map(elem => (
              <ForecastTableCell key={elem.dt} cellData={(elem.main.temp - 275).toFixed(1)} />
            ))}
          </tr>
          <tr>
            <th scope="row">{localization.main.weatherTable.pressure}</th>
            {weatherData.list.map(elem => (
              <ForecastTableCell key={elem.dt} cellData={(elem.main.pressure * 0.75).toFixed(0)} />
            ))}
          </tr>
          <tr>
            <th scope="row">{localization.main.weatherTable.wind.speed}</th>
            {weatherData.list.map(elem => (
              <ForecastTableCell key={elem.dt} cellData={elem.wind.speed} />
            ))}
          </tr>
          <tr>
            <th scope="row">{localization.main.weatherTable.wind.direction}</th>
            {weatherData.list.map(elem => (
              <ForecastTableCell key={elem.dt} cellData={elem.wind.deg} />
            ))}
          </tr>
        </tbody>
      </table>
    );
  }
}

export default ForecastTable;
