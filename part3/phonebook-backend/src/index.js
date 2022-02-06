require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const Person = require('./models/person');

app.use(express.static('build'));
app.use(cors());
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

const PORT = process.env.PORT || 3001;

app.get('/api/persons', (_, res) => {
  Person.find({})
      .then((persons) => {
        return res.json(persons);
      });
});

app.get('/info', (_, res) => {
  Person.count({})
      .then((totalPerson) => {
        let html = `<p>Phonebook has info for ${totalPerson} people</p>`;
        html += `${new Date().toString()}`;

        return res.send(html);
      });
});

app.get('/api/persons/:id', (req, res, next) => {
  const {id} = req.params;

  Person.findById(id)
      .then((person) => {
        return (person) ? res.json(person) : res.status(404).end();
      })
      .catch((err) => next(err));
});

app.delete('/api/persons/:id', (req, res, next) => {
  const {id} = req.params;

  Person.findByIdAndDelete(id)
      .then(() => {
        return res.status(204).end();
      })
      .catch((err) => next(err));
});

app.post('/api/persons', (req, res, next) => {
  const {name, number} = req.body;

  if (!name || !number) {
    return res.status(400).json({
      error: 'name or number is missing',
    });
  }

  const person = new Person({
    name,
    number,
  });

  person.save()
      .then((savedPerson) => {
        return res.status(201).json(savedPerson);
      })
      .catch((err) => next(err));
});

app.put('/api/persons/:id', (req, res, next) => {
  const {id} = req.params;
  const {name, number} = req.body;
  const person = {name, number};

  Person.findByIdAndUpdate(id, person, {new: true, runValidators: true})
      .then((updatedPerson) => {
        res.status(200).json(updatedPerson);
      })
      .catch((err) => next(err));
});


const errorHandler = (err, _, res, next) => {
  const {name: errName} = err;

  if (errName === 'CastError') {
    res.status(400).json({error: 'malformatted id'});
  } else if (errName === 'ValidationError') {
    res.status(400).json({error: err.message});
  }

  next();
};

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
