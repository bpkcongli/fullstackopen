import axios from 'axios';

const BlogsService = {
  _baseUrl: '/api/blogs',
  _token: null,

  async getAll() {
    const response = await axios.get(this._baseUrl);
    return response.data;
  },

  async getSpecificBlog(id) {
    const response = await axios.get(`${this._baseUrl}/${id}`);
    return response.data;
  },

  async add({title, author, url}) {
    const payload = {title, author, url};
    const config = {
      headers: {Authorization: this._token},
    };

    const response = await axios.post(this._baseUrl, payload, config);
    return response.data;
  },

  async addComment(id, {content}) {
    const payload = {content};
    const config = {
      headers: {Authorization: this._token},
    };

    const response = await axios.post(
      `${this._baseUrl}/${id}/comments`,
      payload,
      config,
    );
    return response.data;
  },

  async update(id, {title, author, url, likes}) {
    const payload = {title, author, url, likes};
    const response = await axios.put(`${this._baseUrl}/${id}`, payload);

    return response.data;
  },

  async delete(id) {
    const config = {
      headers: {Authorization: this._token},
    };

    await axios.delete(`${this._baseUrl}/${id}`, config);
  },

  setToken(token) {
    this._token = `Bearer ${token}`;
  },
};

export default BlogsService;
