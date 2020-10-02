import React, { Component } from 'react'
import AppNavBar from './AppNavBar'
import {connect} from 'react-redux'
import {getBooks, deleteBook, addBook, searchBook} from '../actions/bookActions'
import PropTypes from 'prop-types'
import {Button, Table,  Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { store } from 'react-notifications-component';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import 'animate.css/animate.compat.css'

class LibrarianDashboard extends Component {
    state = {
        addModal: false,
        editModal: false,
        book_id: '',
        books_count: '',
        isbn: '',
        authors: '',
        original_publication_year: '',
        original_title: '',
        average_rating: ''
    }

    addToggle = () =>{
        this.setState({
            addModal: !this.state.addModal
        });
    }

    editToggle = () =>{
        this.setState({
            editModal: !this.state.editModal
        });
    }
    componentDidMount(){
        this.props.getBooks();
    }

    onChange = e =>{
        this.setState({ [e.target.name] : e.target.value });
    }

    onDeleteClick = (id) =>{
        this.props.deleteBook(id);

        store.addNotification({
            title: "Book Deleted!!!",
            message: "A book has been deleted from the list",
            type: "danger",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true
            }
          });
    }

    onEditClick = (books) =>{
       this.editToggle();
    }

    onAddSubmit = e =>{
        e.preventDefault();

        const newBook = {
            book_id: this.state.book_id,
            books_count: this.state.books_count,
            isbn: this.state.isbn,
            authors: this.state.authors,
            original_publication_year: this.state.original_publication_year,
            original_title: this.state.original_title,
            average_rating: this.state.average_rating
        }

        this.props.addBook(newBook);

        this.addToggle();

        store.addNotification({
            title: "Book Added!!!",
            message: "New book has been added to the list",
            type: "default",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true
            }
          });
    }

    onSearchSubmit = e =>{
        e.preventDefault();
        
        const searchKeyword ={
            search: this.state.search
        }
 
        this.props.searchBook(searchKeyword);
    }

    oneditdSubmit = e =>{
        e.preventDefault();

        const newBook = {
            book_id: this.state.book_id,
            books_count: this.state.books_count,
            isbn: this.state.isbn,
            authors: this.state.authors,
            original_publication_year: this.state.original_publication_year,
            original_title: this.state.original_title,
            average_rating: this.state.average_rating
        }

        this.props.editBook(newBook);

        this.editToggle();
    }
    render() {
        const { books } = this.props.book;
        
        return (
            <div>
                <ReactNotification />
                <AppNavBar/>
                <div className="container mb-5">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/librarian/dashboard">Books</a></li>
                        <li class="breadcrumb-item"><a href="/librarian/journals">Journals</a></li>
                        <li class="breadcrumb-item"><a href="/librarian/users">Users</a></li>
                    </ol>
                </nav>
                    <form onSubmit={this.onSearchSubmit} className="form-inline my-2 my-lg-0 justify-content-center">
                    <input className="form-control mr-sm-2" name="search" type="search" placeholder="Search" aria-label="Search" onChange={this.onChange}/>
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                <h2>Books</h2>
                <Button color="primary" className="float-right" onClick={this.addToggle}>Add Books</Button>
                <Modal isOpen={this.state.addModal} toggle={this.addToggle}>
                <ModalHeader toggle={this.addToggle}>Add Books</ModalHeader>
                <ModalBody>
                <Form onSubmit={this.onAddSubmit}>
                <FormGroup>
                    <Label for="Book Id">Book Id</Label>
                    <Input type="text" name="book_id" id="book_id" placeholder="Book Id" onChange={this.onChange}/>
                </FormGroup>

                <FormGroup>
                    <Label for="Books count">Books Count</Label>
                    <Input type="number" name="books_count" id="books_count" placeholder="Books Count" onChange={this.onChange}/>
                </FormGroup>

                <FormGroup>
                    <Label for="ISBN">ISBN</Label>
                    <Input type="text" name="isbn" id="isbn" placeholder="ISBN" onChange={this.onChange}/>
                </FormGroup>

                <FormGroup>
                    <Label for="Author">Author</Label>
                    <Input type="text" name="authors" id="authors" placeholder="Author" onChange={this.onChange}/>
                </FormGroup>

                <FormGroup>
                    <Label for="Published Year">Published Year</Label>
                    <Input type="number" name="original_publication_year" id="original_publication_year" placeholder="Published Year" onChange={this.onChange}/>
                </FormGroup>

                <FormGroup>
                    <Label for="Title">Title</Label>
                    <Input type="text" name="original_title" id="original_title" placeholder="Title" onChange={this.onChange}/>
                </FormGroup>

                <FormGroup>
                    <Label for="Average Rating">Average Rating</Label>
                    <Input type="number" name="average_rating" id="average_rating" placeholder="Average Rating" onChange={this.onChange}/>
                </FormGroup>

                <Button>Submit</Button>
                </Form>
                </ModalBody>
                </Modal>

                <Modal isOpen={this.state.editModal} toggle={this.editToggle}>
                <ModalHeader toggle={this.editToggle}>Edit Book</ModalHeader>
                <ModalBody>
                <Form onSubmit={this.onEditSubmit}>
                
                <FormGroup>
                    <Label for="Book Id">Book Id</Label>
                    <Input type="text" name="book_id" id="book_id" placeholder="Book Id" onChange={this.onChange}/>
                </FormGroup>

                <FormGroup>
                    <Label for="Books count">Books Count</Label>
                    <Input type="number" name="books_count" id="books_count" placeholder="Books Count" onChange={this.onChange}/>
                </FormGroup>

                <FormGroup>
                    <Label for="ISBN">ISBN</Label>
                    <Input type="text" name="isbn" id="isbn" placeholder="ISBN" onChange={this.onChange}/>
                </FormGroup>

                <FormGroup>
                    <Label for="Author">Author</Label>
                    <Input type="text" name="authors" id="authors" placeholder="Author" onChange={this.onChange}/>
                </FormGroup>

                <FormGroup>
                    <Label for="Published Year">Published Year</Label>
                    <Input type="number" name="original_publication_year" id="original_publication_year" placeholder="Published Year" onChange={this.onChange}/>
                </FormGroup>

                <FormGroup>
                    <Label for="Title">Title</Label>
                    <Input type="text" name="original_title" id="original_title" placeholder="Title" onChange={this.onChange}/>
                </FormGroup>

                <FormGroup>
                    <Label for="Average Rating">Average Rating</Label>
                    <Input type="number" name="average_rating" id="average_rating" placeholder="Average Rating" onChange={this.onChange}/>
                </FormGroup>
                <Button>Submit</Button>
                </Form>
                </ModalBody>
                </Modal>

                <Table striped>
                <thead>
                    <tr>
                    <th>Book_id</th>
                    <th>Title</th>
                    <th>ISBN</th>
                    <th>Author</th>
                    <th>Book count</th>
                    <th>Published year</th>
                    <th>Is_available</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(({_id, book_id, original_title, isbn, authors, books_count, original_publication_year}) => (
                    <tr key={_id}>
                    <th scope="row">{book_id}</th>
                    <td>{original_title}</td>
                    <td>{isbn}</td>
                    <td>{authors}</td>
                    <td>{books_count}</td>
                    <td>{original_publication_year}</td>
                    <td>yes</td>
                    <td><Button color="primary" className="btn-sm" onClick={this.onEditClick.bind(this, books)}>Edit</Button></td>
                    <td><Button color="danger" className="btn-sm" onClick={this.onDeleteClick.bind(this, _id)}>Delete</Button></td>
                    </tr> 
                    ))}
                </tbody>
                </Table>
                </div>
                
            </div>
        )
    }
}
LibrarianDashboard.propTypes ={
    getBooks: PropTypes.func.isRequired,
    deleteBook: PropTypes.func.isRequired,
    addBook: PropTypes.func.isRequired,
    searchBook: PropTypes.func.isRequired,
    book: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    book: state.book
});

export default connect(mapStateToProps, {getBooks, deleteBook, addBook, searchBook})(LibrarianDashboard);
