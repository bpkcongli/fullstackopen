import React from 'react';

const Person = ({person, deletePersonHandler}) => {
  const {id, name, number} = person;

  return (
    <li>
      {name} {number}
      <button
        type="button"
        onClick={() => {deletePersonHandler(id)}}>delete</button>
    </li>
  )
};

export default Person;
