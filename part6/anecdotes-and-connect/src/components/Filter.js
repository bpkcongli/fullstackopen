import React from 'react';
import {connect} from 'react-redux';
import {setFilter} from '../slices/filterSlice';

const Filter = ({setFilter}) => {
  const filterHandler = (e) => {
    setFilter(e.target.value);
  };

  const style = {
    marginBottom: 10,
    marginTop: 10,
  };

  return (
    <div style={style}>
      filter
      <input onChange={filterHandler} />
    </div>
  );
};

export default connect(null, {setFilter})(Filter);
