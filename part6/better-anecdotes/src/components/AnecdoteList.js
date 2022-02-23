import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {voteAnecdote} from '../slices/anecdoteSlice';
import {setMessage, clearMessage} from '../slices/notificationSlice';

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = [...useSelector(({anecdotes, filter}) => {
    return anecdotes.filter(({content}) => content
        .toLowerCase().includes(filter));
  })];
  anecdotes.sort((a, b) => b.votes - a.votes);

  const voteHandler = (id) => {
    const {content} = anecdotes.find((anecdote) => anecdote.id === id);
    dispatch(voteAnecdote(id));
    dispatch(setMessage(`you voted '${content}'`));
    setTimeout(() => dispatch(clearMessage()), 5000);
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

export default AnecdoteList;
