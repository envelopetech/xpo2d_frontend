import { createSlice } from '@reduxjs/toolkit';
import axios from 'src/utils/axios';

const initialState = {
    exhibitors: [],
    selectedExhibitor: null,
    isModalOpen: false,
    exhibitorassets: []
};

const slice = createSlice({
    name: 'exhibitor',
    initialState,
    reducers: {
        getexhibitor(state, action) {
            let exhibitor = []
            exhibitor = action.payload
            state.selectedExhibitor = exhibitor;
            if (exhibitor.length > 0) {
                localStorage.setItem('exhibitoralldata', JSON.stringify(exhibitor));
            }
        },

        getexhibitors(state, action) {
            let exhibitors = []
            exhibitors = action.payload
            state.exhibitors = exhibitors;            
        },
        getexhibitorassets(state, action) {
            let exhibitor = []
            exhibitor = action.payload
            state.exhibitorassets = exhibitor;
        },
        getexhibitorlocal(state, action) {
            let exhibitor = []
            exhibitor = action.payload
            state.selectedExhibitor = exhibitor;
        },
        openModal(state) {
            state.isModalOpen = true;
        },
        closeModal(state) {
            state.isModalOpen = false;
        }
    }
});

export const reducer = slice.reducer;

export const getexhibitor = (exhibitor_id) => async (dispatch) => {
    const response = await axios.get(`/api/exhibitor/alldata?id=${exhibitor_id}`);
    dispatch(slice.actions.getexhibitor(response.data));
};


export const getexhibitors = (event_id) => async (dispatch) => {
    const response = await axios.get(`/api/exhibitor/eventexhibitorlist?event_id=${event_id}`);
    dispatch(slice.actions.getexhibitors(response.data));
};

export const localstorageexhibitor = (data) => async (dispatch) => {
    dispatch(slice.actions.getexhibitorlocal(data));
};

export const openModal = () => (dispatch) => {
    dispatch(slice.actions.openModal());
};

export const closeModal = () => (dispatch) => {
    dispatch(slice.actions.closeModal());
};


export const getexhibitorassets = (event_id) => async (dispatch) => {
    const response = await axios.get(`/api/exhibitor/assets?event_id=${event_id}`);
    dispatch(slice.actions.getexhibitorassets(response.data));
};

export default slice;
