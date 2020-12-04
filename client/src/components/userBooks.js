import React, {Component} from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle} from 'reactstrap';
import AppNavBar from './AppNavBar';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { getBooks, searchBook, sendPreview} from '../actions/bookActions'
import PropTypes from 'prop-types'

class UserBooks extends Component{
    state = {
        search: ''
    }

   componentDidMount(){
       this.props.getBooks();
   }
   onChange = e =>{
    this.setState({ [e.target.name] : e.target.value });
   }

   onSubmit = e =>{
       e.preventDefault();
       
       const searchKeyword ={
           search: this.state.search
       }

       this.props.searchBook(searchKeyword);
   }
   Preview = (id) =>{
    this.props.sendPreview(id);
}

    render(){
        const { books } = this.props.book;
  return (
    
    <div>
    <AppNavBar/>
        <div className="container">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="/user/dashboard">Dashboard</a></li>
                <li class="breadcrumb-item"><a href="/user/books">Books</a></li>
                <li class="breadcrumb-item"><a href="/user/journal">Journals</a></li>
                <li class="breadcrumb-item"><a href="/user/loan">Books Loan</a></li>
                <li class="breadcrumb-item"><a href="/user/borrowed">Books Borrowed</a></li>
            </ol>
        </nav>
        <form onSubmit={this.onSubmit} className="form-inline my-2 my-lg-0 justify-content-center">
      <input className="form-control mr-sm-2" name="search" type="search" placeholder="Search" aria-label="Search" onChange={this.onChange}/>
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
            <h2>Books</h2>
        <div className="row ml-5">
            {books.map(({_id, original_title, authors, original_publication_year, average_rating}) => (
                 <div className="shadow p-3 mb-5 mr-5 bg-white rounded col-3">
                 <Card>
                <Link to={`/user/book/${_id}`}><CardImg onClick= {this.Preview.bind(this, _id)}top width="100%" height="300px" src="https://99designs-blog.imgix.net/blog/wp-content/uploads/2017/02/attachment_80004080-e1488217702832.jpg?auto=format&q=60&fit=max&w=930" alt="Book image" /></Link>
                <CardBody>
            <CardTitle><h5>{original_title}</h5></CardTitle>
            <CardSubtitle>{authors} {original_publication_year}</CardSubtitle>
            <CardText>Average Rating: {average_rating}</CardText>
                </CardBody>
            </Card>
            </div>
            ))}
            
        
        </div>
    </div>
    </div>
      
  );
    }
};
UserBooks.propTypes ={
    book: PropTypes.object.isRequired,
    getBooks: PropTypes.func.isRequired,
    searchBook: PropTypes.func.isRequired,
    sendPreview: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    book: state.book
});

export default connect(mapStateToProps, {getBooks, searchBook, sendPreview})(UserBooks);