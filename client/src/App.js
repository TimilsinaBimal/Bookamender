import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserLoginForm from './components/auth/userLogin';
import LibrarianLoginForm from './components/auth/librarianLogin';
import RegisterForm from './components/auth/Register';
import {Provider} from 'react-redux';
import store from './store';
import Home from './components/home';
import UserDashboard from './components/userDashboard';
import LibrarianDashboard from './components/librarianDashboard';
// import { loadUser } from './actions/authActions';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import './App.css';

class  App extends Component {
  // componentDidMount(){
  //   store.dispatch(loadUser());
  // }
  render(){
    return (
      <Provider store={store}>
        <div className="App">
        <Router>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/user/login" component={UserLoginForm} exact />
            <Route path="/user/register" component={RegisterForm} exact />
            <Route path="/user/dashboard" component={UserDashboard} exact />
            <Route path="/librarian/login" component={LibrarianLoginForm} exact />
            <Route path="/librarian/dashboard" component={LibrarianDashboard} exact />
          </Switch>
        </Router>
      </div>
      </Provider>
    );
  }
}

export default App;
