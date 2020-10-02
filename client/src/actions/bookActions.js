import {GET_BOOKS, 
        ADD_BOOKS, 
        DELETE_BOOKS, 
        GET_JOURNALS, 
        ADD_JOURNALS, 
        DELETE_JOURNALS, 
        GET_USERS, 
        DELETE_USER,
        SEND_CATEGORY,
        SEND_PREVIEW,
        BOOK_SEARCH,
        BOOK_LOAN} from './types';
import { returnErrors } from './errorActions';
import axios from 'axios';

//get books action
export const getBooks = () => dispatch => {
    axios.get('/librarian/dashboard')
    .then(res => dispatch({
        type: GET_BOOKS,
        payload: res.data
    }))
}
//recommended books
export const recomBooks = () => dispatch => {
    axios.get('/user/dashboard')
    .then(res => dispatch({
        type: GET_BOOKS,
        payload: res.data
    }))
}

export const searchBook = (searchKeyword) => async (dispatch) => {
    try{
        const {data} = await axios.get('/user/books?searchKeyword=' + searchKeyword.search);
        dispatch({type: BOOK_SEARCH, payload: data});
    } catch (err){
        dispatch(returnErrors(err.response.data, err.response.status));
    }
};

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

//get journal action
export const getJournals = () => dispatch => {
    axios.get('/librarian/journals')
    .then(res => dispatch({
        type: GET_JOURNALS,
        payload: res.data
    }))
}

//delete journal action
export const deleteJournal = (id) => dispatch => {
    axios.delete(`/librarian/journals/${id}`)
        .then(res => dispatch({
            type: DELETE_JOURNALS,
            payload: id
        }))
}

//add journal action
export const addJournal = (journal) => dispatch => {
    axios.post('/librarian/journals', journal)
        .then(res => dispatch({
            type: ADD_JOURNALS,
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

//send category
export const sendCategory = (category) => dispatch => {
    axios.get(`/user/books/${category}`)
        .then(res => dispatch({
            type: SEND_CATEGORY,
            payload: category
        }))
}

//send preview
export const sendPreview = (id) => dispatch =>{
    axios.get(`/user/book/${id}`)
    .then(res => dispatch({
        type: SEND_PREVIEW,
        payload: res.data
    }))
}

// book loan
export const bookLoan = (id) => dispatch =>{
    axios.post('/user/loan', {id}) 
    .then(
        res => dispatch ({
            type: BOOK_LOAN,
            payload: res.data
        })
    )
}