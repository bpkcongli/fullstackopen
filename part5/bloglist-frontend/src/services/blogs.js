import axios from 'axios';
const baseUrl = '/api/blogs';

const BlogsService = {
  _baseUrl: '/api/blogs',
  _token: null,

  async getAll() {
    const response = await axios.get(baseUrl);
    return response.data;
  },

  async add({title, author, url}) {
    const payload = {title, author, url};
    const config = {
      headers: {Authorization: this._token},
    };

    const response = await axios.post(baseUrl, payload, config);
    return response.data;
  },

  async update(id, {title, author, url, likes}) {
    const payload = {title, author, url, likes};
    const response = await axios.put(`${baseUrl}/${id}`, payload);

    return response.data;
  },

  async delete(id) {
    const config = {
      headers: {Authorization: this._token},
    };

    await axios.delete(`${baseUrl}/${id}`, config);
  },

  setToken(token) {
    this._token = `Bearer ${token}`;
  },
};

export default BlogsService;
