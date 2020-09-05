import {combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import bookReducer from './bookReducer';

export default combineReducers({
    book: bookReducer,
    error: errorReducer,
    auth: authReducer
});