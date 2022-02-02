import React, {useState, useEffect} from "react";
import './App.css';
import Filter from './components/Filter';
import PersonForm from "./components/PersonForm";
import Persons from './components/Persons';
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [query, setQuery] = useState('');
  const [notification, setNotification] = useState({});

  useEffect(() => {
    personsService
      .getPersons()
      .then((persons) => setPersons(persons))
  }, []);

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
      const updateCond = window.confirm(`${newName} is already added to ` +
        'phonebook, replace the old number with a new one?');
      
      if (updateCond) {
        updatePersonHandler(newName);
      }
      
      return;
    }

    const newPersons = {
      id: Math.max(...persons.map((person) => person.id)) + 1,
      name: newName,
      number: newNumber,
    };

    personsService
      .addPerson(newPersons)
      .then(() => {
        setPersons(persons.concat(newPersons));
        setNotification({text: `Added ${newName}`, class: 'info'});
        setNewName('');
        setNewNumber('');
        setTimeout(() => {setNotification({})}, 3000);
      })
      .catch(() => {
        setNotification({text: `Failed adding a new person`, class: 'warning'});
        setNewName('');
        setNewNumber('');
        setTimeout(() => {setNotification({})}, 3000);
      });
  };

  const updatePersonHandler = (name) => {
    const {id} = persons.find((person) => person.name === name);
    const updatedPerson = {
      id,
      name,
      number: newNumber,
    };

    personsService.updatePerson(id, updatedPerson)
      .then(() => {
        setPersons(
          persons
            .map((person) => person.name === name ? updatedPerson : person)
        );
        setNotification({
          text: `${newName}'s number is successfully updated`,
          class: 'info'
        });
        setNewName('');
        setNewNumber('');
        setTimeout(() => {setNotification({})}, 3000);
      })
      .catch(() => {
        setNotification({
          text: `Failed updating a specific person`,
          class: 'warning',
        });
        setNewName('');
        setNewNumber('');
        setTimeout(() => {setNotification({})}, 3000);
      });
  };

  const deletePersonHandler = (id) => {
    const personName = persons.find((person) => person.id === id).name;
    const deleteCond = window.confirm(`Delete ${personName} ?`);
    
    if (deleteCond) {
      personsService
        .deletePerson(id)
        .then(() => {
          setPersons(
            persons.filter((person) => person.id !== id)
          );
          setNotification({
            text: `Deleted ${personName}`,
            class: 'warning'
          });
          setTimeout(() => {setNotification({})}, 3000);
        })
        .catch(() => {
          setPersons(
            persons.filter((person) => person.id !== id)
          );
          setNotification({
            text: `Information of ${personName} has already been removed from server`,
            class: 'warning'
          });
          setTimeout(() => {setNotification({})}, 3000);
        })
    }
  }

  const filteredPersons = (query) ?
    persons.filter(({name}) => name.toLowerCase().includes(query)) :
    persons;

  return (
    <div>
      <h2>Phonebook</h2>
      {
        (Object.keys(notification).length > 0) ?
          <div className={`notification ${notification.class}`}>
            {notification.text}
          </div> :
          <div className="notification hidden"></div>    
      }
      <Filter queryHandler={queryHandler} />
      <h3>add a new</h3>
      <PersonForm
        name={newName}
        number={newNumber}
        nameHandler={nameHandler}
        numberHandler={numberHandler}
        addPersonHandler={addPersonHandler}
      />
      <h3>Numbers</h3>
      <Persons
        persons={filteredPersons}
        deletePersonHandler={deletePersonHandler}
      />
    </div>
  );
};

export default App;
