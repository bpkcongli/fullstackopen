import {createSlice} from '@reduxjs/toolkit';
import AnecdoteService from '../services/AnecdoteService';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    updateAnecdote(state, action) {
      const {id, updatedAnecdote} = action.payload;
      const updateState = (anecdote) =>
        anecdote.id === id ?
          updatedAnecdote : anecdote;
      return state.map(updateState);
    },
    addAnecdote(state, action) {
      return [...state, action.payload];
    },
    setAnecdotes(_, action) {
      return action.payload;
    },
  },
});

export const {
  updateAnecdote,
  addAnecdote,
  setAnecdotes,
} = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await AnecdoteService.getAllAnecdotes();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createNewAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = {content, votes: 0};
    const savedAnecdote = await AnecdoteService.postNewAnecdote(anecdote);
    dispatch(addAnecdote(savedAnecdote));
  };
};

export const voteAnecdote = (id, anecdotes) => {
  return async (dispatch) => {
    const {content, votes} = anecdotes.find((anecdote) => anecdote.id === id);
    const anecdote = {content, votes: votes + 1};
    const updatedAnecdote = await AnecdoteService
        .putSpecificAnecdote(id, anecdote);
    dispatch(updateAnecdote({id, updatedAnecdote}));
  };
};

export default anecdoteSlice.reducer;
