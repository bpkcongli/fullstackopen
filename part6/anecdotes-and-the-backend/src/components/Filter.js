import React from 'react';
import {useDispatch} from 'react-redux';
import {setFilter} from '../slices/filterSlice';

const Filter = () => {
  const dispatch = useDispatch();

  const filterHandler = (e) => {
    dispatch(setFilter(e.target.value));
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

export default Filter;
