import React from 'react';
import {connect} from 'react-redux';
import {createNewAnecdote} from '../slices/anecdoteSlice';
import {showNotification} from '../slices/notificationSlice';

const AnecdoteForm = ({createNewAnecdote, showNotification}) => {
  const addingAnecdoteHandler = (e) => {
    e.preventDefault();

    const content = e.target.anecdote.value;
    createNewAnecdote(content);
    e.target.anecdote.value = '';
    showNotification(`you created '${content}'`, 5);
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

const mapDispatchToProps = {
  createNewAnecdote,
  showNotification,
};
export default connect(null, mapDispatchToProps)(AnecdoteForm);
