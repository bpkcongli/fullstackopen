import React from 'react';
import Person from './Person';

const Persons = ({persons, deletePersonHandler}) => (
  <div>
    <ul>
      {
        persons.map((person) => {
          return (
            <Person
              key={person.id}
              person={person}
              deletePersonHandler={deletePersonHandler}
            />
          )
        })
      }
    </ul>
  </div>
);

export default Persons;
