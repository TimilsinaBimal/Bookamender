import React, { Component } from 'react';
import AppNavBar from './AppNavBar';
import Jombotron from './jombotron';

class UserDashboard extends Component {
    render() {
        return (
            <div>
                <AppNavBar/>
                
                <div className="container">
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
