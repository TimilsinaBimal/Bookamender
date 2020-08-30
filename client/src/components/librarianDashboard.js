import React, { Component } from 'react'
import AppNavBar from './AppNavBar'
import {Table, Button} from 'reactstrap'

class LibrarianDashboard extends Component {
    render() {
        return (
            <div>
                <AppNavBar/>
                <div className="container mb-5">
                <h2>Books</h2>
                <Button color="primary" className="float-right">Add Books</Button>
                <Table striped>
                <thead>
                    <tr>
                    <th>Book_id</th>
                    <th>Title</th>
                    <th>ISBN</th>
                    <th>Author</th>
                    <th>Publisher</th>
                    <th>Is_available</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">1</th>
                    <td>Introduction to C</td>
                    <td>12345</td>
                    <td>D.R. Simkhada</td>
                    <td>Everest Publication Ltd.</td>
                    <td>yes</td>
                    </tr>

                    <tr>
                    <th scope="row">2</th>
                    <td>Introduction to C</td>
                    <td>12345</td>
                    <td>D.R. Simkhada</td>
                    <td>Everest Publication Ltd.</td>
                    <td>yes</td>
                    </tr>

                    <tr>
                    <th scope="row">3</th>
                    <td>Introduction to C</td>
                    <td>12345</td>
                    <td>D.R. Simkhada</td>
                    <td>Everest Publication Ltd.</td>
                    <td>yes</td>
                    </tr>
                </tbody>
                </Table>
                </div>

                <div className="container mt-5">
                <h2>Journals</h2>
                <Button color="primary" className="float-right">Add Journals</Button>
                <Table striped>
                <thead>
                    <tr>
                    <th>Journal_id</th>
                    <th>Title</th>
                    <th>ISBN</th>
                    <th>Author</th>
                    <th>Publisher</th>
                    <th>Is_available</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">1</th>
                    <td>Introduction to C</td>
                    <td>12345</td>
                    <td>D.R. Simkhada</td>
                    <td>Everest Publication Ltd.</td>
                    <td>yes</td>
                    </tr>

                    <tr>
                    <th scope="row">2</th>
                    <td>Introduction to C</td>
                    <td>12345</td>
                    <td>D.R. Simkhada</td>
                    <td>Everest Publication Ltd.</td>
                    <td>yes</td>
                    </tr>

                    <tr>
                    <th scope="row">3</th>
                    <td>Introduction to C</td>
                    <td>12345</td>
                    <td>D.R. Simkhada</td>
                    <td>Everest Publication Ltd.</td>
                    <td>yes</td>
                    </tr>
                </tbody>
                </Table>
                </div>
                
            </div>
        )
    }
}

export default LibrarianDashboard;
