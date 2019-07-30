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
            modalDragonEdit: false, //toggle do modal de edição/exclusão de um dragão
            modalDragonHistory: false, //toggle do modal que exibe a história do dragão (quando a mesma possui mais de 60 char)
            loadingDragons: true, //controla o estado de carregamento dos dragões
            dragonsAll: [], //recebe todos os dragões
            dragonsScreen: [], //dragões que são exibidos em tela
            dragonSelected: {}, //dragão selecionado (esse state é enviado por props para o modal de edição de um dragão)
            search: "" //controla o campo de "Buscar dragões"
        }

        //atribui para que os métodos sejam executados a partir do componente Home
        this._toggleDragonModal = this._toggleDragonModal.bind(this)
        this._deleteDragon = this._deleteDragon.bind(this)
        this._updateDragon = this._updateDragon.bind(this)
        this._goToDragonDetails = this._goToDragonDetails.bind(this)
    }

    async componentDidMount() {
        this._fetchDragons() //metodo que resgata todos os dragões cadastrados, via API
    }

    _toggleModal = (name, value) => { //controla o estado de exibição dos modais
        let obj = {}
        obj[name] = value
        this.setState(obj)
    }

    _toggleDragonModal = (dragon, modal) => { //recebe os dados do dragão por parâmetro e instancia no state "dragonSelected", que é enviado por props pro modal
        this.setState({ dragonSelected: dragon }, () => {
            this._toggleModal(modal, true) //exibe o modal relacionado
        })
    }

    _fetchDragons = async () => { //método que resgata os dragões via API
        this.setState({ loadingDragons: true }) //seta o loading pra true
        try { //executa uma tentativa de execução dos parâmetros abaixo
            const request = await api.get("/dragon") //requisição da api via GET
            const dragons = request.data.sort(function (a, b) { //pega o "data" (dados) da requisição e utiliza o método "sort" pra ordenar o objeto com os dragões pelo nome alfabéticamente (A-Z)
                if(a.name < b.name) { return -1 }
                if(a.name > b.name) { return 1 }
                return 0
            })
            this.setState({ dragonsAll: dragons, dragonsScreen: dragons, loadingDragons: false }) //atualiza as variaveis de estado com os dados resgatados
          } catch (err) { //caso ocorra algum erro nos parâmetros acima
            console.log(err);
            //this.setState({ error: "Ocorreu um erro ao cadastrar o dragao, tente novamente mais tarde." });
          }
    }

    _searchDragons = text => { //metodo que efetua a "busca" do campo "Buscar dragões"
        const { dragonsAll } = this.state
        this.setState({ loadingDragons: true, search: text }, () => {
            const newDragons = dragonsAll.filter(item => { //utiliza o método "filter" para fazer uma varredura no objeto "dragonsAll" e procurar pelos dragões conforme a busca
                const nameData = text.toLowerCase() //transforma o texto digitado para minúsculo
                return item.name.toLowerCase().trim().indexOf(nameData) > -1 || item.type.toLowerCase().trim().indexOf(nameData) > -1 //caso o objeto com os dragões possuam 1 ou mais dragões, com nome ou tipo semelhante ao digitado, retorna
            })
            this.setState({ dragonsScreen: newDragons, loadingDragons: false }) //atualiza os dragões exibidos em tela
        })
    }

    _deleteDragon = async id => { //metodo que efetua a exclusão dos dragões pelo id recebido
        try {
            await api.delete(`/dragon/${id}`);
            this._fetchDragons()
            this._toggleModal("modalDragonEdit", false)
        } catch (err) {
            console.log(err);
            //this.setState({ error: "Ocorreu um erro ao cadastrar o dragao, tente novamente mais tarde." });
        }
    }

    _updateDragon = async e => { //metodo que atualiza os dados de um dragão conforme os campos recebidos no form
        e.preventDefault()
        const { id, name, type, histories } = e.target
        if(id.value || name.value.length > 0 || type.value) {
            try {
                await api.put(`/dragon/${id.value}`, { name: name.value, type: type.value, histories: histories.value });
                this._fetchDragons()
                this._toggleModal("modalDragonEdit", false)
            } catch (err) {
                console.log(err);
                //this.setState({ error: "Ocorreu um erro ao cadastrar o dragao, tente novamente mais tarde." });
            }
        }
    }

    _goToDragonDetails = dragon => { //metodo que redireciona para a página de detalhes do dragão (é passado pro props para os "Cards" que exibem o dragão na tela inicial)
        this.props.history.push({
            pathname: `/dragon/see/${dragon.id}`,
            state: { dragon }
        });
    }

    render() {
        const { dragonsScreen, dragonSelected } = this.state

        return (
            <>
                <div className="divAll">
                    <HeaderBar />
                    <div className="hrDiv"></div>
                    <Container className="bg-custom-danger" fluid>
                        <Jumbotron className="bg-custom-danger jumbotron-home" fluid>
                            <Container className="text-center">
                                <h1>Bem vindo!</h1>
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
                                    dragonsScreen.map((arr, index) => <CardDragon key={index} dragon={arr} _toggleDragonModal={this._toggleDragonModal} _goToDragonDetails={this._goToDragonDetails} />)
                                }
                            </CardColumns>
                        </Container>
                        <div className="hrDiv hrDiv2"></div>
                        <FooterBar />
                    </Container>
                </div>
                <ModalDragonEdit show={this.state.modalDragonEdit} dragon={dragonSelected} _toggleModal={this._toggleModal} _deleteDragon={this._deleteDragon} _updateDragon={this._updateDragon} />
                <ModalDragonHistory show={this.state.modalDragonHistory} dragon={dragonSelected} _toggleModal={this._toggleModal} />
            </>
        )
    }
}

export default withRouter(Home)