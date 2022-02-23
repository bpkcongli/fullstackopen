import React from 'react';
import {useDispatch} from 'react-redux';
import {createNewAnecdote} from '../slices/anecdoteSlice';
import {setMessage, clearMessage} from '../slices/notificationSlice';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addingAnecdoteHandler = (e) => {
    e.preventDefault();

    const content = e.target.anecdote.value;
    dispatch(createNewAnecdote(content));
    e.target.anecdote.value = '';
    dispatch(setMessage(`you created '${content}'`));
    setTimeout(() => dispatch(clearMessage()), 5000);
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
