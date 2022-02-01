import React from 'react';

const Part = ({part: {name, exercises}}) => (
  <p>
    {name} {exercises}
  </p>
);

export default Part;
