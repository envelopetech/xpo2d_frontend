import { createSlice } from '@reduxjs/toolkit';
import axios from 'src/utils/axios';

const initialState = {
    eventagenda1: [],
    eventagenda2: [],
    eventagenda3: [],

};

const slice = createSlice({
    name: 'eventagenda',
    initialState,
    reducers: {
        getEventAgendas(state, action) {           
            let eventagenda1 = []
            let eventagenda2 = []
            let eventagenda3 = []
            eventagenda1 = action.payload[0]
            eventagenda2 = action.payload[1]
            eventagenda3 = action.payload[2]
            state.eventagenda1 = eventagenda1;
            state.eventagenda2 = eventagenda2;
            state.eventagenda3 = eventagenda3;
            // if(eventagenda.length > 0)              
            // {                  
            //     localStorage.setItem('agenda_data', JSON.stringify(eventagenda));
            // }
        },       
    }
});

export const reducer = slice.reducer;

export const getEventAgendas = (event_id) => async (dispatch) => {
    const response = await axios.get(`/api/eventspeaker/frontlist?event_id=${event_id}`);
    dispatch(slice.actions.getEventAgendas(response.data));
};

export default slice;
