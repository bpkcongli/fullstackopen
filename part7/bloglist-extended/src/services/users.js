import axios from 'axios';

const UsersService = {
  _baseUrl: '/api/users',

  async getAll() {
    const response = await axios.get(this._baseUrl);
    return response.data;
  },

  async getSpecificUser(id) {
    const response = await axios.get(`${this._baseUrl}/${id}`);
    return response.data;
  },
};

export default UsersService;
