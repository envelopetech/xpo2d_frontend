import { createSlice } from '@reduxjs/toolkit';
import axios from 'src/utils/axios';

const initialState = {
    enquiry: [],
    selectedenquiryId: null,
    selectedenquiry: null
};

const slice = createSlice({
    name: 'enquiry',
    initialState,
    reducers: {
        createEnquiry(state, action) {
            let enquiry = []
            enquiry = action.payload
            state.enquiry = [...state.enquiry, enquiry];
          },    
    }
});

export const reducer = slice.reducer;

export const createEnquiry = (data) => async (dispatch) => {
    const response = await axios.post('/api/enquiry/new', data);
  
    dispatch(slice.actions.createEnquiry(response.data));
  };
export default slice;
