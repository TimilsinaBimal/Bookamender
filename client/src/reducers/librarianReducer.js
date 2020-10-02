import {
    LIBRARIAN_LOGIN,
    LOGIN_FAIL
} from "../actions/types";

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  librarian: null
}

export default function(state= initialState, action){
  switch(action.type){
      case LIBRARIAN_LOGIN:
      localStorage.setItem('token', action.payload.token);
          return {
              ...state,
              ...action.payload,
              isAuthenticated: true,
          };
      case LOGIN_FAIL:
          localStorage.removeItem('token');
          return {
              ...state,
              token: null,
              librarian: null,
              isAuthenticated: false
          };
      default:
          return state;
  }
}

// import { LIBRARIAN_SIGNIN_SUCCESS, LIBRARIAN_SIGNIN_REQUEST, LIBRARIAN_SIGNIN_FAIL } from "../actions/types";
//  import Cookie from 'js-cookie';

//  const librarianInfo = Cookie.getJSON('librarianInfo') || null;

// const initialState = {
//     librarianSignin: { librarianInfo }
// };

// export default function(state = initialState, action) {
//     switch (action.type) {
//         case LIBRARIAN_SIGNIN_REQUEST:
//           return { loading: true };
//         case LIBRARIAN_SIGNIN_SUCCESS:
//           return { loading: false, librarianInfo: action.payload };
//         case LIBRARIAN_SIGNIN_FAIL:
//           return { loading: false, error: action.payload };
//         // case USER_LOGOUT:
//         //   return {};
//         default: return state;
// }
// }
