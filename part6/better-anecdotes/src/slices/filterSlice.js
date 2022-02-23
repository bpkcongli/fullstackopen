import {createSlice} from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filters',
  initialState: '',
  reducers: {
    setFilter(_, action) {
      return action.payload;
    },
  },
});

export default filterSlice.reducer;
export const {setFilter} = filterSlice.actions;
