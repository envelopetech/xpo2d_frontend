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
        },  
        briefcasesave(state, action) {             
            const index  = action.payload;            
            let data = state.exhibitorstaff;
            data[index].briefcase_status = true;
            state.exhibitorstaff = data

        }      
    }
});

export const reducer = slice.reducer;

export const geteventexhibitorstaff = (event_id) => async (dispatch) => {
    const response = await axios.get(`/api/event/eventexhibitorstaff?event_id=${event_id}`);
    dispatch(slice.actions.geteventexhibitorstaff(response.data));
};

export const briefcasesave = (data) => async (dispatch) => {    
    const response = await axios.post('/api/briefcase/save', data);
    dispatch(slice.actions.briefcasesave(data.index));
};

export default slice;