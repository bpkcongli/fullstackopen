import axios from 'axios';

const WEATHER_BASE_URL = process.env.REACT_APP_WEATHER_BASE_URL;
const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const weathersService = {
  getWeatherInfoPerCity: (name) => {
    return axios.get(`${WEATHER_BASE_URL}/weather?q=${name}&units=imperial&appId=${WEATHER_API_KEY}`)
      .then((response) => response.data);
  },
};

export default weathersService;
