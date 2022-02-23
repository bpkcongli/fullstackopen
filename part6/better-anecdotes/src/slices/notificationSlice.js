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

export default notificationSlice.reducer;
export const {setMessage, clearMessage} = notificationSlice.actions;
