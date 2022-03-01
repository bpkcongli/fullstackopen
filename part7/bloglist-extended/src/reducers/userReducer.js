import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    initiateUser(_, action) {
      return action.payload;
    },
    removeUser(_, __) {
      return null;
    },
  },
});

export const {initiateUser, removeUser} = userSlice.actions;
export default userSlice.reducer;
