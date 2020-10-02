import React, {Component} from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle} from 'reactstrap';
import AppNavBar from './AppNavBar';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { getBooks, bookLoan} from '../actions/bookActions'
import PropTypes from 'prop-types'

class UserBook extends Component{

    onLoanClick = (id) =>{
        this.props.bookLoan(id)
    }
   
    render(){
        const {books} = this.props.book;
        return(
            <div>
                <AppNavBar/>
                <div className="container">
                <Link to='/user/books'><h4>Back</h4></Link>
                {books.map(({_id, original_title, authors, isbn, book_id, books_count,  original_publication_year, average_rating}) => (
                //  <div className="shadow p-3 mb-5 mr-5 bg-white rounded row">
                 <Card>
                     <CardImg top width="50%" height="350px" src="https://99designs-blog.imgix.net/blog/wp-content/uploads/2017/02/attachment_80004080-e1488217702832.jpg?auto=format&q=60&fit=max&w=930" alt="Book image" />
                    <CardBody>
                    <CardTitle><h5>{original_title}</h5></CardTitle>
                    <CardSubtitle>Author: {authors} {original_publication_year}</CardSubtitle>
                    <CardText>Book id: {book_id}</CardText>
                    <CardSubtitle>ISBN: {isbn}</CardSubtitle>
                    <CardText>Books Count: {books_count}</CardText>
                    <CardSubtitle>Average Rating: {average_rating}</CardSubtitle>
                    <button className="btn btn-secondary mr-2">Rate</button>
                    <button className="btn btn-primary" onClick={this.onLoanClick.bind(this, _id)}>Loan</button>
                    </CardBody>
               </Card>
            ))}
                </div>
            </div>
        )
    }
}
UserBook.propTypes ={
    book: PropTypes.object.isRequired,
    getBooks: PropTypes.func.isRequired,
    bookLoan: PropTypes.func.isRequired
    
}

const mapStateToProps = (state) => ({
    book: state.book
});

export default connect(mapStateToProps, {getBooks, bookLoan})(UserBook);