import { createSlice } from '@reduxjs/toolkit';
import axios from 'src/utils/axios';

const initialState = {
    users: [],
    selectedEventId: null,
    selectedRange: null,    
};

const slice = createSlice({
    name: 'generalsettings',
    initialState,
    reducers: {
        getuser(state, action) {
            let user = []
            user = action.payload
            state.users = user;
        },
        updateUser(state, action) {
            let user = []
            //user.push(action.payload);   
            user = action.payload
            // state.users = _.map(state.users, (_user) => {            
            //     if (_user.id === user.id) {
            //         return user;
            //     }

            //     return _user;
            // });
            state.users = user
        },        
    }
});

export const reducer = slice.reducer;

export const getuser = () => async (dispatch) => {
    const response = await axios.get('api/user/me');
    dispatch(slice.actions.getuser(response.data[0]));
};

export const updateUser = (data) => async (dispatch) => {
    const response = await axios.post('api/user/update', data);
    dispatch(slice.actions.updateUser(response.data));
};

export const updateUserprofilepic = (data) => async (dispatch) => {
    const response = await axios.post('api/user/update/profilepic', data);
    dispatch(slice.actions.updateUser(response.data));
};

export const updateUsercompanylogo = (data) => async (dispatch) => {
    const response = await axios.post('api/user/update/companylogo', data);
    dispatch(slice.actions.updateUser(response.data));
};
export const updateUserpassword = (data) => async (dispatch) => {
    const response = await axios.post('api/user/update/password', data);
    dispatch(slice.actions.updateUser(response.data));
};



export default slice;
