import React, { Component } from 'react';
import AppNavBar from './AppNavBar';

class UserBorrowed extends Component{
    render(){
        return(
            <div>
                <AppNavBar/>
                <div className="container">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/user/dashboard">Dashboard</a></li>
                        <li class="breadcrumb-item"><a href="/user/books">Books</a></li>
                        <li class="breadcrumb-item"><a href="/user/journal">Journals</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Books Borrowed</li>
                    </ol>
                </nav>
                <h2>Books Borrowed</h2>
                </div>
            </div>
        )
    }
}

export default UserBorrowed;