import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user'); //only put relative path in client, proxy will do the job in dev
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
    const res = await axios.post('/api/stripe', token);
    dispatch({ type: FETCH_USER, payload: res.data }); //we get back the exact same User model from res.data
};