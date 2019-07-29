import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"
import { Container, CardColumns, Card, Navbar, Nav, Jumbotron, Form, Col, Row, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import './styles.css';
import Logo from "../../assets/dragon-logo.png";
import api from "../../services/api"


class Home extends Component {
    state = {
        open: true,
        xsNav: 2,
        xsBody: 10
    }

    render() {
        return (
            <>
                <div class="divAll">
                    <Navbar bg="custom-danger-outline" variant="custom-danger-outline" >
                        <img src={Logo} className="logo" alt="Dragon Logo" />
                        <Nav className="mr-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#features">Cadastro</Nav.Link>
                        </Nav>
                        <Button variant="custom-white">Sair</Button>
                    </Navbar>
                    <div className="hrDiv">
                    </div>
                    <Container className="bg-custom-danger" fluid>
                        <Jumbotron className="bg-custom-danger jumbotron-home" fluid>
                            <Container className="text-center">
                                <h1>Bem vindo Dragon!</h1>
                                <p>
                                    Abaixo temos uma lista com todos os dragões cadastrados.
                                </p>
                                <Row className="justify-content-md-center">
                                    <Col md="8"><Form.Control bsPrefix="inputSearch" type="text" class="inputSearch" as="input" placeholder="Buscar dragões" /></Col>
                                </Row>

                            </Container>
                        </Jumbotron>
                        <Container className="cardContainer">
                            <CardColumns>
                                <Card className="cardComponent p-3" >
                                    <Card.Header className="cardHeader"><Card.Title>Nome</Card.Title></Card.Header>
                                    <Card.Body className="cardBody">
                                        <Card.Title>Tipo</Card.Title>
                                        <Card.Text>
                                            Exemplo de história do dragao
                                        </Card.Text>
                                        <Card.Text class="cardTextFooter">
                                            <small className="">Data de Cadastro: 2019/08/01</small>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </CardColumns>
                        </Container>
                        <footer class="Footer">
                            <Container>
                                <p className="text-center pFooter">Copyright &copy; Leonardo Sampaio da Cruz 2019</p>
                            </Container>
                        </footer>
                    </Container>
                </div>
            </>
        )
    }
}

export default withRouter(Home)
//export default Home