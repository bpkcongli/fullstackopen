import React from 'react';
import {connect} from 'react-redux';
import {voteAnecdote} from '../slices/anecdoteSlice';
import {showNotification} from '../slices/notificationSlice';

const AnecdoteList = (props) => {
  const anecdotes = [...props.anecdotes];
  anecdotes.sort((a, b) => b.votes - a.votes);

  const voteHandler = (id) => {
    const {content} = anecdotes.find((anecdote) => anecdote.id === id);
    props.voteAnecdote(id, anecdotes);
    props.showNotification(`you voted '${content}'`, 5);
  };

  return (
    <div>
      {anecdotes.map((anecdote) =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteHandler(anecdote.id)}>vote</button>
          </div>
        </div>,
      )}
    </div>
  );
};

const mapStateToProps = ({anecdotes, filter}) => {
  const filteredAnecdotes = anecdotes.filter(({content}) => content
      .toLowerCase().includes(filter));

  return {
    anecdotes: filteredAnecdotes,
  };
};

const mapDispatchToProps = {
  voteAnecdote,
  showNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
