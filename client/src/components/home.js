import React from 'react';
import AppNavBar from './AppNavBar';
import Slide from './carousel';
import {Button} from 'reactstrap';
import {Link} from 'react-router-dom';

function Home() {
    return (
        <div>
        <AppNavBar/>
        <div className="d-flex justify-content-center mb-10">
          <div>
          <Link to="/user/login"><Button color="primary">User Login</Button></Link>
          </div>
          <div>
          <Link to="/user/register"><Button color="primary">User Register</Button></Link>
          </div>
          <div>
          <Link to="/librarian/login"><Button color="primary">Librarian</Button></Link>
          </div>
          </div>
          <div className="container w-100 h-25">
          <Slide/>
          </div>
          
          
           
        </div>
        
    )
}

export default Home;
