import React from 'react';
import { Navbar, Nav } from 'react-bootstrap'
import Logo from "../../assets/dragon-logo.png";
import { logout } from "../../services/auth" //importa o metodo de logout para atribuir ao Nav "Sair"
import './styles.css';

export default function HeaderBar() {
    return (
        <Navbar sticky="top" bg="custom-danger-outline" variant="custom-danger-outline" className="headerBar" >
            <img src={Logo} className="logo" alt="Dragon Logo" />
            <Nav className="mr-auto">
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link href="/dragon/register">Cadastro</Nav.Link>
            </Nav>
            <Nav.Link href="/" bsPrefix="custom-nav-white" onClick={() => logout()} >Sair</Nav.Link>
        </Navbar>
    );
}
