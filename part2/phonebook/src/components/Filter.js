import React from 'react';

const Filter = ({queryHandler}) => (
  <div>
    filter shown with<input type="text" onChange={queryHandler} />
  </div>
);

export default Filter;
