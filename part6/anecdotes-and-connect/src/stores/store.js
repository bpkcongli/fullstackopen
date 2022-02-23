import {configureStore} from '@reduxjs/toolkit';
import anecdoteReducer from '../slices/anecdoteSlice';
import notificationReducer from '../slices/notificationSlice';
import filterReducer from '../slices/filterSlice';

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    notification: notificationReducer,
    filter: filterReducer,
  },
});

export default store;
