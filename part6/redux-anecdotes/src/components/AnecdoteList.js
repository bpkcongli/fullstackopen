import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {voteActionCreator} from '../reducers/anecdoteReducer';

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = [...useSelector((state) => state)];
  anecdotes.sort((a, b) => b.votes - a.votes);

  const voteHandler = (id) => {
    dispatch(voteActionCreator(id));
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
