import React from 'react';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';
import AppNavBar from '../AppNavBar';

const LibrarianLoginForm = (props) => {
  return (
    <div>
      <AppNavBar/>
      <div className="container h-100">
    <div className="row h-100">
      <div className="row h-100">
        <Form className="col justify-content-center align-items-center">
        <h2> Login </h2>
      <FormGroup>
        <Label for="Email">Email</Label>
        <Input type="email" name="email" id="Email" placeholder="Email" />
      </FormGroup>
      <FormGroup>
        <Label for="Password">Password</Label>
        <Input type="password" name="password" id="Password" placeholder="Password" />
      </FormGroup>
      <Button>Submit</Button>
       </Form>
      </div>
    </div>
  </div>

    </div>
    
  );
}

export default LibrarianLoginForm;