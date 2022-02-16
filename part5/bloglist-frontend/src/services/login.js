import axios from 'axios';

const LoginService = {
  _baseUrl: '/api/login',

  async login({username, password}) {
    try {
      const payload = {username, password};
      const response = await axios.post(this._baseUrl, payload);
      return response.data;
    } catch (err) {
      throw new Error(err.response.data.error);
    }
  },
};

export default LoginService;
