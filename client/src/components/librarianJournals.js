import React, { Component } from 'react'
import AppNavBar from './AppNavBar'
import {connect} from 'react-redux'
import {getJournals, deleteJournal, addJournal} from '../actions/bookActions'
import PropTypes from 'prop-types'
import {Button, Table,  Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';

class LibrarianJournals extends Component {
    state = {
        modal: false,
        title: '',
        isbn: ''
    }

    toggle = () =>{
        this.setState({
            modal: !this.state.modal
        });
    }
    componentDidMount(){
        this.props.getJournals();
    }

    onChange = e =>{
        this.setState({ [e.target.name] : e.target.value });
    }

    onDeleteClick = (id) =>{
        this.props.deleteJournal(id);
    }

    onSubmit = e =>{
        e.preventDefault();

        const newJournal = {
            title: this.state.title,
            isbn: this.state.isbn
        }

        this.props.addJournal(newJournal);

        this.toggle();
    }

    render() {
        const { journals } = this.props.book;
        let count = 0;
        return (
            <div>
                <AppNavBar/>
                <div className="container mb-5">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/librarian/dashboard">Books</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Journals</li>
                        <li class="breadcrumb-item"><a href="/librarian/users">Users</a></li>
                    </ol>
                </nav>
                <h2>Journals</h2>
                <Button color="primary" className="float-right" onClick={this.toggle}>Add Journals</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Add Journals</ModalHeader>
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
                <Button>Submit</Button>
                </Form>
                </ModalBody>
                </Modal>

                <Table striped>
                <thead>
                    <tr>
                    <th>Journal_id</th>
                    <th>Title</th>
                    <th>ISBN</th>
                    <th>Is_available</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {journals.map(({_id, title, isbn}) => (
                    <tr key={_id}>
                    <th scope="row">{++count}</th>
                    <td>{title}</td>
                    <td>{isbn}</td>
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
LibrarianJournals.propTypes ={
    getJournals: PropTypes.func.isRequired,
    deleteJournal: PropTypes.func.isRequired,
    addJournal: PropTypes.func.isRequired,
    journal: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    book: state.book
});

export default connect(mapStateToProps, {getJournals, deleteJournal, addJournal})(LibrarianJournals);
