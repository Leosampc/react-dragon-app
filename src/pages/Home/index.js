import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { Container, CardColumns, Card, Jumbotron, Form, Col, Row, Button } from 'react-bootstrap'
import './styles.css';

import HeaderBar from '../../components/HeaderBar'
import FooterBar from '../../components/FooterBar'
import ModalDragonEdit from '../../components/ModalDragonEdit'
import ModalDragonHistory from '../../components/ModalDragonHistory'
import api from "../../services/api"


class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalDragonEdit: false,
            modalDragonHistory: false
        }
        this._toggleModal = this._toggleModal.bind(this)
    }

    _toggleModal = (name, value) => {
        let obj = {}
        obj[name] = value
        this.setState(obj)
    }

    render() {
        return (
            <>
                <div class="divAll">
                    <HeaderBar />
                    <div className="hrDiv"></div>
                    <Container className="bg-custom-danger" fluid>
                        <Jumbotron className="bg-custom-danger jumbotron-home" fluid>
                            <Container className="text-center">
                                <h1>Bem vindo Dragon!</h1>
                                <p>
                                    Abaixo temos uma lista com todos os dragões cadastrados.
                                </p>
                                <Row className="justify-content-md-center">
                                    <Col md="8">
                                        <Form.Control bsPrefix="inputSearch" type="text" class="inputSearch" as="input" placeholder="Buscar dragões" />
                                    </Col>
                                </Row>
                            </Container>
                        </Jumbotron>
                        <div className="hrDiv"></div>
                        <Container className="cardContainer">
                            <CardColumns>
                                <Card className="cardComponent p-3" >
                                    <Card.Header className="cardHeader">
                                        <Card.Title>Nome</Card.Title>
                                    </Card.Header>
                                    <Card.Body className="cardBody">
                                        <Card.Title>Tipo</Card.Title>
                                        <Card.Text>
                                            Exemplo de história do dragao
                                            <p 
                                                className="pReadingMore" 
                                                href="#" onClick={() => this.setState({ modalDragonHistory: true }) } 
                                            >
                                                ...ler mais
                                            </p>
                                        </Card.Text>
                                        <Card.Text class="cardTextFooter">
                                            <small className="">Data de Cadastro: 01/08/2019</small>
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer className="cardFooter">
                                        <Button variant="custom-card-footer" onClick={() => this.setState({ modalDragonEdit: true })}>Visualizar</Button>
                                    </Card.Footer>
                                </Card>
                            </CardColumns>
                        </Container>
                        <FooterBar />
                    </Container>
                </div>
                <ModalDragonEdit show={this.state.modalDragonEdit} _toggleModal={this._toggleModal} />
                <ModalDragonHistory show={this.state.modalDragonHistory} _toggleModal={this._toggleModal} />
            </>
        )
    }
}

export default withRouter(Home)