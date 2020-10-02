import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserLoginForm from './components/auth/userLogin';
import ProtectedRoute from './components/auth/protectedRoute';
import LibrarianLoginForm from './components/auth/librarianLogin';
import RegisterForm from './components/auth/Register';
import {Provider} from 'react-redux';
import store from './store';
import Home from './components/home';
import UserDashboard from './components/userDashboard';
import UserBooks from './components/userBooks';
import UserBook from './components/userBook';
import UserJournal from './components/userJournal';
import UserBorrowed from './components/userBorrowed';
import LibrarianDashboard from './components/librarianDashboard';
import LibrarianJournals from './components/librarianJournals';
import LibrarianUsers from './components/librarianUsers';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
//import { loadUser } from './actions/authActions';

class  App extends Component {

  //  componentDidMount(){
  //    store.dispatch(loadUser());
  //  }

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
            {/* <Route path="/user/books/:category" component={UserBooks} exact /> */}
            <Route path="/user/books" component={UserBooks} exact />
            <Route path="/user/book/:id" component={UserBook} exact />
            <Route path="/user/borrowed" component={UserBorrowed} exact />
            <Route path="/user/journal" component={UserJournal} exact />
            <Route path="/librarian/login" component={LibrarianLoginForm} exact />
            <ProtectedRoute path="/librarian/dashboard" component={LibrarianDashboard} exact />
            <Route path="/librarian/journals" component={LibrarianJournals} exact />
            <Route path="/librarian/users" component={LibrarianUsers} exact />
          </Switch>
        </Router>
      </div>
      </Provider>
    );
  }
}

export default App;
