import {GET_BOOKS, ADD_BOOKS, DELETE_BOOKS, GET_USERS, DELETE_USER} from './types';
import axios from 'axios';

//get books action
export const getBooks = () => dispatch => {
    axios.get('/librarian/dashboard')
    .then(res => dispatch({
        type: GET_BOOKS,
        payload: res.data
    }))
}

//delete books action
export const deleteBook = (id) => dispatch => {
    axios.delete(`/librarian/dashboard/${id}`)
        .then(res => dispatch({
            type: DELETE_BOOKS,
            payload: id
        }))
}

//add books action
export const addBook = (book) => dispatch => {
    axios.post('/librarian/dashboard', book)
        .then(res => dispatch({
            type: ADD_BOOKS,
            payload: res.data
        }))
}

//get user info
export const getUsers = () => dispatch => {
    axios.get('/librarian/users')
    .then(res => dispatch({
        type: GET_USERS,
        payload: res.data
    }))
}

//delete user
export const deleteUser = (id) => dispatch => {
    axios.delete(`/librarian/users/${id}`)
        .then(res => dispatch({
            type: DELETE_USER,
            payload: id
        }))
}