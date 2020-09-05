import React, { Component } from 'react'
import AppNavBar from './AppNavBar'
import {connect} from 'react-redux'
import {getBooks, deleteBook, addBook} from '../actions/bookActions'
import PropTypes from 'prop-types'
import {Button, Table,  Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';

class LibrarianDashboard extends Component {
    state = {
        modal: false,
        title: '',
        isbn: '',
        author: '',
        publisher: ''
    }

    toggle = () =>{
        this.setState({
            modal: !this.state.modal
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
    }

    onSubmit = e =>{
        e.preventDefault();

        const newBook = {
            title: this.state.title,
            isbn: this.state.isbn,
            author: this.state.isbn,
            publisher: this.state.publisher
        }

        this.props.addBook(newBook);

        this.toggle();
    }

    render() {
        const { books } = this.props.book;
        let count = 0;
        return (
            <div>
                <AppNavBar/>
                <div className="container mb-5">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item active" aria-current="page">Books</li>
                        <li class="breadcrumb-item"><a href="/librarian/journals">Journals</a></li>
                        <li class="breadcrumb-item"><a href="/librarian/users">Users</a></li>
                    </ol>
                </nav>
                <h2>Books</h2>
                <Button color="primary" className="float-right" onClick={this.toggle}>Add Books</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Add Books</ModalHeader>
                <ModalBody>
                <Form onSubmit={this.onSubmit}>
                <FormGroup>
                    <Label for="Title">Title</Label>
                    <Input type="text" name="title" id="title" placeholder="Title" onChange={this.onChange}/>
                </FormGroup>

                <FormGroup>
                    <Label for="ISBN">ISBN</Label>
                    <Input type="text" name="isbn" id="isbn" placeholder="ISBN" onChange={this.onChange}/>
                </FormGroup>

                <FormGroup>
                    <Label for="Author">Author</Label>
                    <Input type="text" name="author" id="author" placeholder="Author" onChange={this.onChange}/>
                </FormGroup>

                <FormGroup>
                    <Label for="Publisher">Publisher</Label>
                    <Input type="text" name="publisher" id="publisher" placeholder="Publisher" onChange={this.onChange}/>
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
                    <th>Publisher</th>
                    <th>Is_available</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(({_id, title, isbn, author, publisher}) => (
                    <tr key={_id}>
                    <th scope="row">{++count}</th>
                    <td>{title}</td>
                    <td>{isbn}</td>
                    <td>{author}</td>
                    <td>{publisher}</td>
                    <td>yes</td>
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
    book: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    book: state.book
});

export default connect(mapStateToProps, {getBooks, deleteBook, addBook})(LibrarianDashboard);
