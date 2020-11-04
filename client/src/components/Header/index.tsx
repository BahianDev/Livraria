import React from 'react';
import {  Nav, Navbar } from 'react-bootstrap';
import {Link} from 'react-router-dom';


const Header: React.FC = () => {
    return(
        <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#home">Livraria</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
               
                <Nav.Item as={Link} className="nav-link" to="/products">Products</Nav.Item>
            </Nav>

        </Navbar.Collapse>
        </Navbar>
    )
}

export default Header;