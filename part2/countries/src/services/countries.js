import axios from 'axios';

const COUNTRY_ENDPOINT = process.env.REACT_APP_COUNTRY_ENDPOINT;

const countriesService = {
  getAllCountries: () => {
    return axios.get(COUNTRY_ENDPOINT)
      .then((response) => response.data);
  },
};

export default countriesService;
