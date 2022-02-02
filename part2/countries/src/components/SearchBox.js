import React from 'react';

const SearchBox = ({query, queryHandler}) => (
  <div>
    find countries 
    <input type="text" value={query} onChange={queryHandler} />
  </div>
);

export default SearchBox;
