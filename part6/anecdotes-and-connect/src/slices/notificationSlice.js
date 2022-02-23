import {createSlice} from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    message: '',
    tid: null,
  },
  reducers: {
    setMessage(_, action) {
      return {
        message: action.payload.message,
        tid: action.payload.tid,
      };
    },
    clearMessage(_, __) {
      return {
        message: '',
        tid: null,
      };
    },
    hideMessage(state, _) {
      clearTimeout(state.tid);
      return state;
    },
  },
});

export const showNotification = (message, timeInSec) => {
  return async (dispatch) => {
    const tid = setTimeout(() => dispatch(clearMessage()), timeInSec * 1000);
    dispatch(hideMessage());
    dispatch(setMessage({message, tid}));
  };
};

export default notificationSlice.reducer;
export const {setMessage, clearMessage, hideMessage} = notificationSlice.actions;
