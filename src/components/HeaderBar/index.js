import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap'
import Logo from "../../assets/dragon-logo.png";
import './styles.css';

export default function HeaderBar() {
    return (
        <Navbar sticky="top" bg="custom-danger-outline" variant="custom-danger-outline" className="headerBar" >
            <img src={Logo} className="logo" alt="Dragon Logo" />
            <Nav className="mr-auto">
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link href="/dragon/register">Cadastro</Nav.Link>
            </Nav>
            <Button variant="custom-white">Sair</Button>
        </Navbar>
    );
}
