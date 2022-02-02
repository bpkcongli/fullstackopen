import axios from 'axios';

const personsService = {
  addPerson: (persons) => {
    return axios.post('http://localhost:3001/persons', persons);
  },

  getPersons: () => {
    return axios.get('http://localhost:3001/persons')
      .then((response) => response.data);
  },

  deletePerson: (id) => {
    return axios.delete(`http://localhost:3001/persons/${id}`);
  },

  updatePerson: (id, person) => {
    return axios.put(`http://localhost:3001/persons/${id}`, person);
  },
};

export default personsService;
