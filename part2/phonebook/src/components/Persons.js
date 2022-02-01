import React from 'react';

const Persons = ({persons}) => (
  <div>
    <ul>
      {
        persons.map(({name, number, id}) => <li key={id}>{name} {number}</li>)
      }
    </ul>
  </div>
);

export default Persons;
