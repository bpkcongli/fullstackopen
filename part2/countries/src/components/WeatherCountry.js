import React, {useState, useEffect} from 'react';
import weathersService from '../services/weathers';

const WEATHER_IMAGE_BASE_URL = process.env.REACT_APP_WEATHER_IMAGE_BASE_URL;

const WeatherCountry = ({name}) => {
  const [weatherInfo, setWeatherInfo] = useState({});

  const mappingToModel = ({weather, main, wind}) => (
    {
      weatherDesc: weather[0].description,
      weatherIcon: weather[0].icon,
      temp: main.temp,
      wind: wind.speed
    }
  );

  useEffect(() => {
    weathersService.getWeatherInfoPerCity(name)
      .then((weatherInfo) => {
        setWeatherInfo(mappingToModel(weatherInfo));
      });
  }, [name]);

  return (
    <div>
      <h3>Weather in {name}</h3>
      <b>temperature: </b>{weatherInfo.temp} Fahrenheit<br />
      <img
        alt={weatherInfo.weatherDesc}
        src={
          (!weatherInfo.weatherIcon) ?
            `${WEATHER_IMAGE_BASE_URL}/01d.png` : 
            `${WEATHER_IMAGE_BASE_URL}/${weatherInfo.weatherIcon}.png`
          }
      />{weatherInfo.weatherDesc}<br />
      <b>wind: </b>{weatherInfo.wind} mph
    </div>
  );
};

export default WeatherCountry;
