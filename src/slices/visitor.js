import { createSlice } from '@reduxjs/toolkit';
import axios from 'src/utils/axios';
import _ from 'lodash';

const initialState = {
    briefcase: [],
    leaderboard: []
};

const slice = createSlice({
    name: 'visitor',
    initialState,
    reducers: {
        getbriefcase(state, action) {
            let briefcase = []
            briefcase = action.payload
            state.briefcase = briefcase;
        },
        getleaderboard(state, action) {
            let leaderboard = []
            leaderboard = action.payload
            state.leaderboard = leaderboard;
        },
        deletebriefcase(state, action) {
            let briefcase = []
            briefcase = action.payload
            _.map(briefcase, (item) => {
                state.briefcase = _.reject(state.briefcase, { id: item });
            })
        },
    }
});

export const reducer = slice.reducer;

export const getbriefcase = () => async (dispatch) => {
    const response = await axios.get(`/api/briefcase/list`);
    dispatch(slice.actions.getbriefcase(response.data));
};

export const deletebriefcase = (data) => async (dispatch) => {
    const response = await axios.post('/api/briefcase/remove', data);
    dispatch(slice.actions.deletebriefcase(data));
};

export const getleaderboard = () => async (dispatch) => {
    const response = await axios.get(`/api/leadertype/list`);
    dispatch(slice.actions.getleaderboard(response.data));
};

export const lederboardsave = (data) => async () => {
    const response = await axios.post('/api/leadertype/save', data);    
};

export const customlog_save = (data) => async () => {
    const response = await axios.post('/api/customlog/save', data);    
};
export default slice;
