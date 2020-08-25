import axios from 'axios';
import { returnErrors } from './errorActions';

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    REGISTER_SUCCESS,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    // LOGOUT_SUCCESS,
    REGISTER_FAIL
} from './types';

//load user
export const loadUser = () => (dispatch, getState) => {
    dispatch({type: USER_LOADING});
    
    axios.get('/user/dashboard', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            });
        });
}

//Register User
export const register = ({name, email, password}) => dispatch =>{
    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({name, email, password});

    axios.post('/user/register', body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err =>{
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
            dispatch({
                type: REGISTER_FAIL
            });
        });
}

//Login user
export const login = ({email, password}) => dispatch =>{
    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({email, password});

    axios.post('/user/login', body, config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err =>{
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({
                type: LOGIN_FAIL
            });
        });
}




export const tokenConfig = getState =>{
    //get token
    const token = getState().auth.token;

    //header
    const config = {
        headers: {
            "Content-type" : "application/json"
        }
    }

    if(token){
        config.headers['x-auth-token'] = token;
    }
    return config;
}


