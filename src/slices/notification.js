import { createSlice } from '@reduxjs/toolkit';
import axios from 'src/utils/axios';

const initialState = {
  notifications: []
};

const slice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    getNotifications(state, action) {
      const { notifications } = action.payload;

      state.notifications = notifications;
    }
  }
});

export const reducer = slice.reducer;

export const getNotifications = () => async (dispatch) => {
  const response = await axios.get('/api/notifications');

  dispatch(slice.actions.getNotifications(response.data));
};

export const userpage_save = (data) => async () => {  
  const response = await axios.post('/api/userpage/save', data);
  //debugger;
};

export default slice;
