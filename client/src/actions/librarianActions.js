import axios from 'axios';
import { returnErrors } from './errorActions';
import { LIBRARIAN_LOGIN , LOGIN_FAIL} from './types';

  export const login = ({email, password}) => dispatch =>{
    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({email, password});

    axios.post('/librarian/login', body, config)
        .then(res => dispatch({
            type: LIBRARIAN_LOGIN,
            payload: res.data
        }))
        .catch(err =>{
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({
                type: LOGIN_FAIL
            });
        });

}

// import Axios from "axios";
// import Cookie from 'js-cookie';
// import { LIBRARIAN_SIGNIN_SUCCESS , LIBRARIAN_SIGNIN_FAIL, LIBRARIAN_SIGNIN_REQUEST} from './types';

// const login = (email, password) => async (dispatch) => {
//     dispatch({ type: LIBRARIAN_SIGNIN_REQUEST, payload: { email, password } });
//     try {
//       const { data } = await Axios.post("/librarian/login", { email, password });
//       dispatch({ type: LIBRARIAN_SIGNIN_SUCCESS, payload: data });
//       Cookie.set('librarianInfo', JSON.stringify(data));
//     } catch (error) {
//       dispatch({ type: LIBRARIAN_SIGNIN_FAIL, payload: error.message });
//     }
//   }
  
//   export{login};