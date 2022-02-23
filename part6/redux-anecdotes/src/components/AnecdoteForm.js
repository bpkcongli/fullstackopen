import React from 'react';
import {useDispatch} from 'react-redux';
import {newAnecdoteActionCreator} from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addingAnecdoteHandler = (e) => {
    e.preventDefault();

    const anecdote = e.target.anecdote.value;
    dispatch(newAnecdoteActionCreator(anecdote));
    e.target.anecdote.value = '';
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addingAnecdoteHandler}>
        <div><input name="anecdote" /></div>
        <button>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
