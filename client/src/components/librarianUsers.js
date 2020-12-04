import React, { Component } from 'react'
import AppNavBar from './AppNavBar'
import {Table, Button} from 'reactstrap'
import {connect} from 'react-redux'
import {getUsers, deleteUser} from '../actions/bookActions'
import PropTypes from 'prop-types'

class LibrarianUsers extends Component {
    componentDidMount(){
        this.props.getUsers();
    }

    onDeleteClick = (id) =>{
        this.props.deleteUser(id);
    }

    render() {
        const { users } = this.props.book;

        let count = 0;
        return (
            <div>
                <AppNavBar/>
                <div className="container">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/librarian/dashboard">Books</a></li>
                        <li class="breadcrumb-item"><a href="/librarian/journals">Journals</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Users</li>
                        <li class="breadcrumb-item"><a href="/librarian/employee">Employees</a></li>
                    </ol>
                </nav>
                <h2>Users</h2>
                <Table striped>
                <thead>
                    <tr>
                    <th>User_id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {users.map(({_id, name, email}) => (
                    <tr key={_id}>
                    <th scope="row">{++count}</th>
                    <td>{name}</td>
                    <td>{email}</td>
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

LibrarianUsers.propTypes = {
    getUsers: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
     book: state.book
 });

export default connect(mapStateToProps, {getUsers, deleteUser})(LibrarianUsers);