import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'reactstrap';
import AppNavBar from './components/AppNavBar';
import UserLoginForm from './components/auth/userLogin';
import LibrarianLoginForm from './components/auth/librarianLogin';
import RegisterForm from './components/auth/Register';
import {Provider} from 'react-redux';
import store from './store';
// import { loadUser } from './actions/authActions';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';

import './App.css';

class  App extends Component {
  // componentDidMount(){
  //   store.dispatch(loadUser());
  // }
  render(){
    return (
      <Provider store={store}>
        <div className="App">
        <AppNavBar/>
        <Router>
          <div className="d-flex justify-content-center mb-10">
          <div>
          <Link to="/user/login"><Button color="primary">User Login</Button></Link>
          </div>
          <div>
          <Link to="/user/register"><Button color="primary">User Register</Button></Link>
          </div>
          <div>
          <Link to="/librarian/login"><Button color="primary">Librarian</Button></Link>
          </div>
          </div>
          <Switch>
            <Route path="/user/login" component={UserLoginForm} exact />
            <Route path="/user/register" component={RegisterForm} exact />
            <Route path="/librarian/login" component={LibrarianLoginForm} exact />
          </Switch>
        </Router>
      </div>
      </Provider>
    );
  }
}

export default App;
