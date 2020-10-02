import React, { Component } from 'react';
import AppNavBar from './AppNavBar';
import { Button, Jumbotron, Container } from 'reactstrap';
import {
    Card, CardImg, CardBody,
    CardTitle, CardSubtitle, CardText
  } from 'reactstrap';
import {connect} from 'react-redux';
import {recomBooks, sendCategory} from '../actions/bookActions'
import PropTypes from 'prop-types'
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import 'animate.css/animate.compat.css'
import { store } from 'react-notifications-component';



class UserDashboard extends Component {
    componentDidMount(){
        this.props.recomBooks();
    }
   

    notify = () =>{
        store.addNotification({
            title: "Welcome to Bookamender!!!",
            message: "Find the book of your choice.",
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
    Category = (category) =>{
        this.props.sendCategory(category);
    }


    render() {
        const { books } = this.props.book;
        return (
            <div>
                 <ReactNotification />
                <AppNavBar/>
                <div className="container">

                 {/*<div className="row-sm">
                <ListGroup>
                    <ListGroupItem active tag="button" action><h5>Department</h5></ListGroupItem>
                    {/* {books.map(({category}) =>(
                        <Link to={`/user/books/${category}`}><ListGroupItem key={category} tag="button" onClick={this.Category.bind(this, category)} action>{category}</ListGroupItem></Link>
                    ))} 
                </ListGroup> 
                </div>*/}

                <div>
                <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item active" aria-current="page">Dashboard</li>
                    <li class="breadcrumb-item"><a href="/user/books">Books</a></li>
                    <li class="breadcrumb-item"><a href="/user/journal">Journals</a></li>
                    <li class="breadcrumb-item"><a href="/user/borrowed">Books Borrowed</a></li>
                </ol>
            </nav>
                <div className="float-right">
                    <Button color="primary" onClick={this.notify}>
                        Notification
                    </Button>
                    
                </div>

                

                <div>
                <Jumbotron>
                    <Container>
            <h1 className="display-5">Hello user!</h1>
                        <p className="lead">"The only thing that you absolutely have to know, is the location of the library."<br/> -Albert Einstein </p>
                    </Container>
                </Jumbotron>
                </div>

                <h2>Recommendation</h2>
                <div className="container mt-5">
                {books.slice(0,6).map(({original_title, authors, original_publication_year, average_rating}) => (
                 <div className="shadow p-3 mb-5 mr-5 bg-white rounded col">
                 <Card>
                <CardImg top width="100%" height="350px" src="https://images.pexels.com/photos/34592/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="Book image" />
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
        </div>
        )
    }
}

UserDashboard.propTypes ={
    book: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    recomBooks: PropTypes.func.isRequired,
    sendCategory: PropTypes.func.isRequired
}


const mapStateToProps = (state) => ({
    book: state.book
});

export default connect(mapStateToProps, {recomBooks, sendCategory})(UserDashboard);

