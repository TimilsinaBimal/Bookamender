import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Label, Input, Alert} from 'reactstrap';
import {register} from '../../actions/authActions';
import React, { Component } from 'react'
import AppNavBar from '../AppNavBar';

class RegisterForm extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    msg: null
  };

  static propTypes = {
    isauthenticated: PropTypes.bool.isRequired,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps){
    const {error} = this.props;
    if(error !==prevProps.error){
      if(error.id === 'REGISTER_FAIL'){
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
    const {name, email, password} = this.state;

    const newUser = {
      name,
      email,
      password
    };

    this.props.register(newUser);
  }

    render() {
        return (
    <div>
      <AppNavBar/>
    <div className="container h-100">
    <div className="row h-100">
      <div className="row h-100">
        <Form className="col justify-content-center align-items-center" onSubmit= {this.onSubmit}>
        <h2> Register </h2>
        {this.state.msg ? <Alert color="danger">{ this.state.msg }</Alert>: null}
        <FormGroup>
        <Label for="Name">Name</Label>
        <Input type="text" name="name" id="name" placeholder="Name" onChange={this.onChange}/>
      </FormGroup>
      <FormGroup>
        <Label for="Email">Email</Label>
        <Input type="email" name="email" id="email" placeholder="Email" onChange={this.onChange}/>
      </FormGroup>
      <FormGroup>
        <Label for="Password">Password</Label>
        <Input type="password" name="password" id="password" placeholder="Password" onChange={this.onChange} />
      </FormGroup>
      <Button> Register </Button>
      </Form>
      </div>
    </div>
  </div>
  </div>
        )
    }
}

const mapStateToProps = state =>({
  isauthenticated: state.auth.isauthenticated,
  error: state.error
});

export default connect(mapStateToProps, {register})(RegisterForm);
