import React, { Component } from 'react';
import AppNavBar from './AppNavBar';
import Jombotron from './jombotron';
import { Badge, Button } from 'reactstrap';
import { loadUser } from '../actions/authActions';
import store from '../store';


class UserDashboard extends Component {
    componentDidMount(){
        store.dispatch(loadUser());
    }

    render() {
        return (
            <div>
                <AppNavBar/>
                <div className="container">
                <div className="float-right">
                    <Button color="primary">
                        Notifications <Badge color="secondary">0</Badge>
                    </Button>
                </div>

                <div>
                <Jombotron/>
                </div>
                
                <h2>Category</h2>
                <div>
                <div class="shadow p-3 mb-5 bg-white rounded">Science</div>
                </div>

                <div>
                <div class="shadow p-3 mb-5 bg-white rounded">Maths</div>
                </div>

                <div>
                <div class="shadow p-3 mb-5 bg-white rounded">English</div>
                </div>

                <div>
                <div class="shadow p-3 mb-5 bg-white rounded">Nepali</div>
                </div>

                <div>
                <div class="shadow p-3 mb-5 bg-white rounded">Chinese</div>
                </div>

                </div>
            </div>
        )
    }
}

export default UserDashboard;
