import React, { Component } from 'react'
import AppNavBar from './AppNavBar'
import {connect} from 'react-redux'
import {getEmployees, deleteEmployee, addEmployee} from '../actions/bookActions'
import PropTypes from 'prop-types'
import {Button, Table,  Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { store } from 'react-notifications-component';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import 'animate.css/animate.compat.css'

class LibrarianEmployees extends Component {
    state = {
        modal: false,
        name: '',
        email: '',
        address: '',
        phone: '',
    }

    toggle = () =>{
        this.setState({
            modal: !this.state.modal
        });
    }

   
    componentDidMount(){
        this.props.getEmployees();
    }

    onChange = e =>{
        this.setState({ [e.target.name] : e.target.value });
    }

    onDeleteClick = (id) =>{
        this.props.deleteEmployee(id);

        store.addNotification({
            title: "Employee Deleted!!!",
            message: "An Employee has been deleted from the list",
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

   

    onSubmit = e =>{
        e.preventDefault();

        const newEmployee= {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            phone: this.state.phone
        }

        this.props.addEmployee(newEmployee);

        this.toggle();

        store.addNotification({
            title: "Employee Added!!!",
            message: "New employee has been added to the list",
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

  

    
    render() {
        const { employee } = this.props.book;
        let count = 0;
        
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
                        <li class="breadcrumb-item active" aria-current="page">Employees</li>
                    </ol>
                </nav>
                <h2>Employees</h2>
                <Button color="primary" className="float-right" onClick={this.toggle}>Add Employees</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Add Employees</ModalHeader>
                <ModalBody>
                <Form onSubmit={this.onSubmit}>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input type="text" name="name" id="name" placeholder="Name" onChange={this.onChange}/>
                </FormGroup>

                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" id="email" placeholder="Email" onChange={this.onChange}/>
                </FormGroup>

                <FormGroup>
                    <Label for="Address">Address</Label>
                    <Input type="text" name="address" id="address" placeholder="Address" onChange={this.onChange}/>
                </FormGroup>

                <FormGroup>
                    <Label for="Phone">Phone Number</Label>
                    <Input type="text" name="phone" id="phone" placeholder="Phone Number" onChange={this.onChange}/>
                </FormGroup>

                <Button>Submit</Button>
                </Form>
                </ModalBody>
                </Modal>

               
                <Table striped>
                <thead>
                    <tr>
                    <th>Employee_id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {employee.map(({_id ,name, email, address, phone}) => (
                    <tr key={_id}>
                    <th scope="row">{++count}</th>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>{address}</td>
                    <td>{phone}</td>
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
LibrarianEmployees.propTypes ={
    getEmployees: PropTypes.func.isRequired,
    deleteEmployee: PropTypes.func.isRequired,
    addEmployee: PropTypes.func.isRequired,
    employee: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    book: state.book
});

export default connect(mapStateToProps, {getEmployees, deleteEmployee, addEmployee})(LibrarianEmployees);
