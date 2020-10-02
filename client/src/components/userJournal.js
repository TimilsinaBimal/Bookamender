import React, { Component } from 'react';
import AppNavBar from './AppNavBar';
import {connect} from 'react-redux'
import {getJournals} from '../actions/bookActions'
import PropTypes from 'prop-types'

class UserJournal extends Component{
    componentDidMount(){
        this.props.getJournals();
    }
    render(){
        const { journals } = this.props.book;
        return(
            <div>
                <AppNavBar/>
                <div className="container">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/user/dashboard">Dashboard</a></li>
                        <li class="breadcrumb-item"><a href="/user/books">Books</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Journal</li>
                        <li class="breadcrumb-item"><a href="/user/borrowed">Books Borrowed</a></li>
                    </ol>
                </nav>
                <h2>Journals</h2>
                { journals.map(({title}) =>(
                <div class="shadow p-3 mb-5 bg-white rounded"><h5>{title}</h5></div>
             ))}
                </div>
            </div>
        )
    }
}


UserJournal.propTypes ={
    getJournals: PropTypes.func.isRequired,
    journal: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    book: state.book
});

export default connect(mapStateToProps, {getJournals})(UserJournal);