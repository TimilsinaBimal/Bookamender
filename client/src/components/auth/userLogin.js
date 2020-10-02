import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Label, Input, Alert} from 'reactstrap';
import {login, loadUser} from '../../actions/authActions';
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import AppNavBar from '../AppNavBar';

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    msg: null
  };

 static propTypes = {
    isauthenticated: PropTypes.bool.isRequired,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    loadUser: PropTypes.func.isRequired
  }

  componentDidUpdate(prevProps){
    const {error} = this.props;
    if(error !==prevProps.error){
      if(error.id === 'LOGIN_FAIL'){
        this.setState({msg : error.msg.msg});
      } else
      {
        this.setState({msg : null});
      }
    }
    
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit = e =>{
    e.preventDefault();
    const {isauthenticated} = this.props;
    const {email, password} = this.state;

    const user = {
      email,
      password
    };

    this.props.login(user);

    console.log(isauthenticated);
    
    if(isauthenticated){
      this.props.history.push('/user/dashboard');
    }
    else{
      this.props.history.push('/user/login');
    }
    
  }

    render() {
        return (
         <div>
           <AppNavBar/>
         
    <div className="container ">
    <div className="row h-100">
      <div className="row h-100">
     
        <Form className="col justify-content-center align-items-center" onSubmit= {this.onSubmit}>
        <h2> Login </h2>
        {this.state.msg ? <Alert color="danger">{ this.state.msg }</Alert>: null}
      <FormGroup>
        <Label for="Email">Email</Label>
        <Input type="email" name="email" id="email" placeholder="Email" onChange={this.onChange}/>
      </FormGroup>
      <FormGroup>
        <Label for="Password">Password</Label>
        <Input type="password" name="password" id="password" placeholder="Password" onChange={this.onChange} />
      </FormGroup>
      <Button> Login </Button>
      <p>Don't have an account? <Link to="/user/register">Register Here!</Link></p>
      </Form>
      
      </div>
    </div>
  </div>
  </div> 
        )
    }
}

const mapStateToProps = state =>({
  isauthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, {login, loadUser})(LoginForm);
