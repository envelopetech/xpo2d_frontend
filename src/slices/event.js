import { createSlice } from '@reduxjs/toolkit';
import axios from 'src/utils/axios';

const initialState = {
    exhibitorstaff: [],   
};
const slice = createSlice({
    name: 'exhibitor',
    initialState,
    reducers: {
        geteventexhibitorstaff(state, action) {
            let exhibitor = []
            exhibitor = action.payload
            state.exhibitorstaff = exhibitor;           
        }      
    }
});

export const reducer = slice.reducer;

export const geteventexhibitorstaff = (event_id) => async (dispatch) => {
    const response = await axios.get(`/api/event/eventexhibitorstaff?event_id=${event_id}`);
    dispatch(slice.actions.geteventexhibitorstaff(response.data));
};
export default slice;