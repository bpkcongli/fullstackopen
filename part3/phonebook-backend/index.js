const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(express.json());
app.use(morgan('tiny'));
app.use(morgan((tokens, req, res) => {
  if (req.method === 'POST') {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      JSON.stringify(req.body),
    ].join(' ');
  }
}));

const PORT = 3001;
let persons = [
  {
    'id': 1,
    'name': 'Arto Hellas',
    'number': '040-123456',
  },
  {
    'id': 2,
    'name': 'Ada Lovelace',
    'number': '39-44-5323523',
  },
  {
    'id': 3,
    'name': 'Dan Abramov',
    'number': '12-43-234345',
  },
  {
    'id': 4,
    'name': 'Mary Poppendieck',
    'number': '39-23-6423122',
  },
];

app.get('/api/persons', (_, res) => {
  return res.json(persons);
});

app.get('/info', (_, res) => {
  let html = `<p>Phonebook has info for ${persons.length} people</p>`;
  html += `${new Date().toString()}`;

  return res.send(html);
});

app.get('/api/persons/:id', (req, res) => {
  const {id} = req.params;
  const person = persons.find((person) => person.id === parseInt(id));

  return (person) ?
    res.json(person) : res.status(404).end();
});

app.delete('/api/persons/:id', (req, res) => {
  const {id} = req.params;
  persons = persons.filter((person) => person.id !== parseInt(id));

  return res.status(204).end();
});

app.post('/api/persons', (req, res) => {
  const {name, number} = req.body;

  if (!name || !number) {
    return res.status(400).json({
      error: 'name or number is missing',
    });
  }

  const personIndex = persons.findIndex((person) => person.name === name);
  if (personIndex > -1) {
    return res.status(400).json({
      error: 'name must be unique',
    });
  }

  const person = {
    id: Math.floor(Math.random() * 1000000000),
    name,
    number,
  };
  persons = persons.concat(person);

  return res.status(201).json(person);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
