import {createSlice} from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: '',
  reducers: {
    setMessage(_, action) {
      return action.payload;
    },
    clearMessage(_, __) {
      return '';
    },
  },
});

export const setNotification = (message, timeInSec) => {
  return async (dispatch) => {
    dispatch(setMessage(message));
    setTimeout(() => dispatch(clearMessage()), timeInSec * 1000);
  };
};

export default notificationSlice.reducer;
export const {setMessage, clearMessage} = notificationSlice.actions;
