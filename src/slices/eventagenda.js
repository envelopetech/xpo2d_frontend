import { createSlice } from '@reduxjs/toolkit';
import axios from 'src/utils/axios';

const initialState = {
    eventagenda: [],

};

const slice = createSlice({
    name: 'eventagenda',
    initialState,
    reducers: {
        getEventAgendas(state, action) {
            let eventagenda = []
            eventagenda = action.payload
            state.eventagenda = eventagenda;
            if(eventagenda.length > 0)              
            {                  
                localStorage.setItem('agenda_data', JSON.stringify(eventagenda));
            }
        },       
    }
});

export const reducer = slice.reducer;

export const getEventAgendas = (event_id) => async (dispatch) => {
    const response = await axios.get(`/api/eventspeaker/frontlist?event_id=${event_id}`);
    dispatch(slice.actions.getEventAgendas(response.data));
};

export default slice;
