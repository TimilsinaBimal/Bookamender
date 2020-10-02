import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Label, Input, Alert} from 'reactstrap';
import {login} from '../../actions/librarianActions';
import React, { Component } from 'react';
import AppNavBar from '../AppNavBar';

class LibrarianLoginForm extends Component {
  state = {
    email: '',
    password: '',
    msg: null
  };

 static propTypes = {
    isauthenticated: PropTypes.bool.isRequired,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
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

    const newlibrarian = {
      email,
      password
    };

    this.props.login(newlibrarian);

    console.log(isauthenticated);
    
    if(isauthenticated){
      this.props.history.push('/librarian/dashboard');
    }
    else{
      this.props.history.push('/librarian/login');
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
      </Form>
      
      </div>
    </div>
  </div>
  </div> 
        )
    }
}

const mapStateToProps = state =>({
  isauthenticated: state.lib.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, {login})(LibrarianLoginForm);

// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import {login} from '../../actions/librarianActions';
// import { Button, Form, FormGroup, Label, Input} from 'reactstrap';
// import AppNavBar from '../AppNavBar';

// function LibrarianLoginForm (props) {

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const librarianSignin = useSelector(state => state.librarianSignin);
//   const { librarianInfo} = librarianSignin;
//   const dispatch = useDispatch();
//   const redirect = props.location.search ? props.location.search.split("=")[1] : '/librarian/dashboard';
//   useEffect(() => {
//     if (librarianInfo) {
//       props.history.push(redirect);
//     }
//     return () => {
//       //
//     };
//   }, [librarianInfo]);

//   const submitHandler = (e) => {
//     e.preventDefault();
//     dispatch(login(email, password));

//   }
//   return (
//         <div>
//                  <AppNavBar/>
               
//           <div className="container ">
//           <div className="row h-100">
//             <div className="row h-100">
           
//               <Form className="col justify-content-center align-items-center" onSubmit={submitHandler}>
//               <h2> Login </h2>
//               {/* {this.state.msg ? <Alert color="danger">{ this.state.msg }</Alert>: null} */}
//             <FormGroup>
//               <Label for="Email">Email</Label>
//               <Input type="email" name="email" id="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
//             </FormGroup>
//             <FormGroup>
//               <Label for="Password">Password</Label>
//               <Input type="password" name="password" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
//             </FormGroup>
//             <Button> Login </Button>
//             </Form>
            
//             </div>
//           </div>
//         </div>
//         </div> 
//       )
  
// }
// export default LibrarianLoginForm;