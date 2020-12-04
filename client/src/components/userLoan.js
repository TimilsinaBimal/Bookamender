import React, { Component } from 'react';
import AppNavBar from './AppNavBar';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {showLoan, borrowedBook, removeLoan} from '../actions/bookActions';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle} from 'reactstrap';
  

class UserLoan extends Component{
    componentDidMount(){
        this.props.showLoan();
    }

    onReceivedClick = (id) =>{
        this.props.borrowedBook(id);
        this.props.removeLoan(id);
    }

    render(){
        const {loan} = this.props.book;
        return(
            <div>
                <AppNavBar/>
                <div className="container">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/user/dashboard">Dashboard</a></li>
                        <li class="breadcrumb-item"><a href="/user/books">Books</a></li>
                        <li class="breadcrumb-item"><a href="/user/journal">Journals</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Books Loan</li>
                        <li class="breadcrumb-item"><a href="/user/borrowed">Books Borrowed</a></li>
                    </ol>
                </nav>
                <h2>Books Loan</h2>
                <div className="row mt-5">
                {loan.map(({_id, original_title, authors, original_publication_year, average_rating}) => (
                 <div className="shadow p-3 mb-5 mr-5 bg-white rounded col-3">
                 <Card>
                <CardImg top width="100%" height="300px" src="https://99designs-blog.imgix.net/blog/wp-content/uploads/2017/02/attachment_80004080-e1488217702832.jpg?auto=format&q=60&fit=max&w=930" alt="Book image" />
                <CardBody>
                <CardTitle><h5>{original_title}</h5></CardTitle>
                <CardSubtitle>{authors} {original_publication_year}</CardSubtitle>
                <CardText>Average Rating: {average_rating}</CardText>
                <button className="btn btn-danger btn-sm" onClick={this.onReceivedClick.bind(this, _id)}>Received</button>
                </CardBody>
            </Card>
            </div>
            ))}
                </div>
                
                </div>
            </div>
        )
    }
}

UserLoan.propTypes = {
    loan: PropTypes.object.isRequired,
    showLoan: PropTypes.func.isRequired,
    borrowedBook: PropTypes.func.isRequired,
    removeLoan: PropTypes.func.isRequired
    
}

const mapStateToProps = (state) => ({
    book: state.book
});

export default connect(mapStateToProps, {showLoan, borrowedBook, removeLoan})(UserLoan);