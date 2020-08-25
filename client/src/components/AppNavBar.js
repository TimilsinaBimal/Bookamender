import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';

class AppNavBar extends Component {
    constructor(props){
        super(props);
        this.state = { isOpen: false };
        this.toggle = this.toggle.bind(this);
    }
    toggle(){
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render(){
        return(
        <div>
            <Navbar color="dark" dark expand="sm" className = "mb-5">
                <Container>
                    <NavbarBrand href='/'>Bookamender</NavbarBrand>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink href="/">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/">About</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/">Contact</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
        );
    }
}

export default AppNavBar;