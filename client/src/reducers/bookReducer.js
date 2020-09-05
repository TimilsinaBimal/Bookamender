import {GET_BOOKS, ADD_BOOKS, DELETE_BOOKS, GET_USERS, DELETE_USER} from '../actions/types';

const initialState = {
    books: [],
    users: []
}

export default function(state = initialState, action) {
    switch(action.type){
        case GET_BOOKS:
            return{
                ...state,
                books: action.payload
            }
        case DELETE_BOOKS:
            return{
                ...state,
                books: state.books.filter(book => book._id !== action.payload)
            }
        case ADD_BOOKS:
            return{
                ...state,
                books: [action.payload, ...state.books]
            }
        case GET_USERS:
            return{
                ...state,
                users: action.payload
            }
        case DELETE_USER:
            return{
                ...state,
                users: state.users.filter(user => user._id !== action.payload)
            }
        default:
            return state;
    }
}
