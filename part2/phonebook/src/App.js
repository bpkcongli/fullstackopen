import React, {useState} from "react";
import Filter from './components/Filter';
import PersonForm from "./components/PersonForm";
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [query, setQuery] = useState('');

  const nameHandler = (e) => {
    setNewName(e.target.value);
  };

  const numberHandler = (e) => {
    setNewNumber(e.target.value);
  };

  const queryHandler = (e) => {
    setQuery(e.target.value);
  };

  const checkPersonIsAlreadyExist = (name) => {
    return persons.find((person) => person.name === name) ?
      true : false;
  };

  const addPersonHandler = (e) => {
    e.preventDefault();
    if (checkPersonIsAlreadyExist(newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const newPersons = persons.concat({
      id: persons.length+1,
      name: newName,
      number: newNumber,
    });
    setPersons(newPersons);
  };

  const filteredPersons = (query) ?
    persons.filter(({name}) => name.toLowerCase().includes(query)) :
    persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter queryHandler={queryHandler} />
      <h3>add a new</h3>
      <PersonForm  
        nameHandler={nameHandler}
        numberHandler={numberHandler}
        addPersonHandler={addPersonHandler}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
