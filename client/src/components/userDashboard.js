import React, { Component } from 'react';
import store from '../store';
import {loadUser} from '../actions/authActions';

class UserDashboard extends Component {
    componentDidMount(){
        store.dispatch(loadUser());
    }
    render() {
        return (
            <div>
                <h2>User dashboard</h2>
            </div>
        )
    }
}

export default UserDashboard;
