import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { Container, CardColumns, Jumbotron, Form, Col, Row } from 'react-bootstrap'
import './styles.css';

import HeaderBar from '../../components/HeaderBar'
import FooterBar from '../../components/FooterBar'
import CardDragon from '../../components/CardDragon'
import ModalDragonEdit from '../../components/ModalDragonEdit'
import ModalDragonHistory from '../../components/ModalDragonHistory'
import api from "../../services/api"


class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalDragonEdit: false,
            modalDragonHistory: false,
            loadingDragons: true,
            dragonsAll: [],
            dragonsScreen: [],
            dragonSelected: {},
            search: ""
        }
        this._toggleDragonEditModal = this._toggleDragonEditModal.bind(this)
        this._toggleDragonHistoryModal = this._toggleDragonHistoryModal.bind(this)
    }

    async componentDidMount() {
        this._fetchDragons()
        console.log(this.state.dragons)
    }

    _toggleModal = (name, value) => {
        let obj = {}
        obj[name] = value
        this.setState(obj)
    }

    _toggleDragonEditModal = (dragon) => {
        this.setState({ dragonSelected: dragon }, () => {
            this._toggleModal("modalDragonEdit", true)
        })
    }

    _toggleDragonHistoryModal = (dragon) => {
        this.setState({ dragonSelected: dragon }, () => {
            this._toggleModal("modalDragonHistory", true)
        })
    }

    _fetchDragons = async () => {
        this.setState({ loadingDragons: true })
        try {
            const dragons = await api.get("/dragon");
            this.setState({ dragonsAll: dragons.data, dragonsScreen: dragons.data, loadingDragons: false })
          } catch (err) {
            console.log(err);
            //this.setState({ error: "Ocorreu um erro ao cadastrar o dragao, tente novamente mais tarde." });
          }
    }

    _searchDragons = text => {
        const { dragonsAll, dragonsScreen, loadingDragons } = this.state
        this.setState({ loadingDragons: true, search: text }, () => {
            const newDragons = dragonsAll.filter(item => {
                const nameData = text.toLowerCase()
                return item.name.toLowerCase().trim().indexOf(nameData) > -1 || item.type.toLowerCase().trim().indexOf(nameData) > -1
            })
            console.log(newDragons)
            this.setState({ dragonsScreen: newDragons, loadingDragons: false })
        })
    }

    render() {
        const { dragonsScreen, dragonSelected, loadingDragons } = this.state

        return (
            <>
                <div className="divAll">
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
                                        <Form.Control
                                            bsPrefix="inputSearch" 
                                            type="text" 
                                            className="inputSearch" 
                                            as="input" 
                                            placeholder="Buscar dragões"
                                            onChange={e => this._searchDragons(e.target.value) }
                                        />
                                    </Col>
                                </Row>
                            </Container>
                        </Jumbotron>
                        <div className="hrDiv"></div>
                        <Container className="cardContainer">
                            <CardColumns>
                                {
                                    dragonsScreen.map((arr, index) => <CardDragon dragon={arr} _toggleDragonEditModal={this._toggleDragonEditModal} _toggleDragonHistoryModal={this._toggleDragonHistoryModal} />)
                                }
                            </CardColumns>
                        </Container>
                        <div className="hrDiv hrDiv2"></div>
                        <FooterBar />
                    </Container>
                </div>
                <ModalDragonEdit show={this.state.modalDragonEdit} dragon={dragonSelected} _toggleModal={this._toggleModal} />
                <ModalDragonHistory show={this.state.modalDragonHistory} dragon={dragonSelected} _toggleModal={this._toggleModal} />
            </>
        )
    }
}

export default withRouter(Home)