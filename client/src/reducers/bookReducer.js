import {GET_BOOKS,
        ADD_BOOKS, 
        DELETE_BOOKS,
        GET_USERS,
        DELETE_USER,
        GET_JOURNALS, 
        ADD_JOURNALS, 
        DELETE_JOURNALS,
        SEND_CATEGORY,
        SEND_PREVIEW,
        BOOK_SEARCH, 
        BOOK_LOAN} from '../actions/types';

const initialState = {
    books: [],
    journals: [],
    users: [],
    loan: []
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
                books: [...state.books, action.payload]
            }
            case GET_JOURNALS:
                return{
                    ...state,
                    journals: action.payload
                }
            case DELETE_JOURNALS:
                return{
                    ...state,
                    journals: state.journals.filter(journal => journal._id !== action.payload)
                }
            case ADD_JOURNALS:
                return{
                    ...state,
                    journals: [action.payload, ...state.journals]
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
        case SEND_CATEGORY:
                return{
                    ...state,
                    books: state.books.filter(book => book.category === action.payload)
                }
        case BOOK_SEARCH:
            return{
                ...state,
                books: action.payload
            }
        case SEND_PREVIEW:
            return{
                ...state,
                books: action.payload
            }
        case BOOK_LOAN:
            return{
                ...state,
                loan: action.payload
            }
        default:
            return state;
    }
}
