import axios from 'axios';

const BASE_URL = 'http://localhost:3001/anecdotes';

const AnecdoteService = {
  async getAllAnecdotes() {
    const response = await axios.get(BASE_URL);
    return response.data;
  },

  async postNewAnecdote(anecdote) {
    const response = await axios.post(BASE_URL, anecdote);
    return response.data;
  },

  async putSpecificAnecdote(id, anecdote) {
    const response = await axios.put(`${BASE_URL}/${id}`, anecdote);
    return response.data;
  },
};

export default AnecdoteService;
