import React from 'react';
import './index.css';
import ForecastTableCell from './ForecastTableCell';

class ForecastTable extends React.Component {
  getFormattedDate(date) {
    return new Date(date);
  }

  render() {
    const { weatherData } = this.props;
    console.log(weatherData);
    if (!weatherData || !weatherData.list) { return null; }

    return (
      <table className="table table-sm forecast-table">
        <thead>
          <tr>
            <th>Day of the week</th>
            {weatherData.list.map((elem) => {
              const formattedDate = this.getFormattedDate(elem.dt_txt);
              const cellData = `${formattedDate.getDate()}/${formattedDate.getMonth() + 1}`;
              return <ForecastTableCell key={elem.dt} cellData={cellData} />;
            })}
          </tr>
          <tr>
            <th>Local time</th>
            {weatherData.list.map((elem) => {
              const formattedDate = this.getFormattedDate(elem.dt_txt);
              const cellData = `${formattedDate.getHours()}`;
              return <ForecastTableCell key={elem.dt} cellData={cellData} />;
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Cloudness, %:</th>
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
            <th scope="row">Weather phenomena:</th>
            {weatherData.list.map(elem => (
              <ForecastTableCell key={elem.dt} cellData={elem.weather[0].description} />
            ))}
          </tr>
          <tr>
            <th scope="row">Temperature, °C:</th>
            {weatherData.list.map(elem => (
              <ForecastTableCell key={elem.dt} cellData={(elem.main.temp - 275).toFixed(1)} />
            ))}
          </tr>
          <tr>
            <th scope="row">Pressure, mmHg:</th>
            {weatherData.list.map(elem => (
              <ForecastTableCell key={elem.dt} cellData={(elem.main.pressure * 0.75).toFixed(0)} />
            ))}
          </tr>
          <tr>
            <th scope="row">Wind: speed , m/s:</th>
            {weatherData.list.map(elem => (
              <ForecastTableCell key={elem.dt} cellData={elem.wind.speed} />
            ))}
          </tr>
          <tr>
            <th scope="row">direction:</th>
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
