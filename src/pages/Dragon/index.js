import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { Container, Form, Row, Col } from 'react-bootstrap'
import './styles.css';

import HeaderBar from '../../components/HeaderBar'
import FooterBar from '../../components/FooterBar'
import api from "../../services/api"


class Dragon extends Component {
    state = {
      id: (this.props.match.params.id) ? this.props.match.params.id : null, //caso exista o id recebido pelo link, seta o state id
      dragon: []
    }

    async componentDidMount() {
      try { //realiza uma tentativa de execução dos parâmetros abaixo
          const request = await api.get(`/dragon/${this.state.id}`) //busca um dragão especifico pelo ID via API
          let dragon = request.data

          dragon.createdAt = this.formatDate(dragon.createdAt)
          
          this.setState({ dragon: dragon }) //seta o dragao recebido
      } catch (err) {
          console.log(err);
          //this.setState({ error: "Ocorreu um erro ao cadastrar o dragao, tente novamente mais tarde." });
      }
    }

    formatDate = (timestamp) => { //funcao para transformar o timestamp em data e retornar na formatação correta
      const DateObject = new Date(timestamp) //cria um objeto Date com o timestamp recebido
      let correctMonth = DateObject.getUTCMonth() + 1 //meses vão de 0-11, então conforme o mes resgatado soma +1 no valor

      correctMonth = (parseInt(correctMonth) < 10) ? "0" + correctMonth : correctMonth //adiciona um 0 à frente da string do mês caso o mesmo seja menor que 10

      return `${DateObject.getUTCDate()}/${correctMonth}/${DateObject.getUTCFullYear()}` //cria a string com a data correta, formato: dd/mm/YYYY
    }

    render() {
      const { dragon } = this.state

      return (
          <div className="divAll">
            <HeaderBar />
            <div className="hrDiv"></div>
            <div className="hrDiv"></div>
            <Container className="bg-custom-danger bodyContainer" fluid>
              <Container className="text-center">
                  <h1>Detalhes</h1>
                  <p>
                      Abaixo temos os detalhes do dragão selecionado.
                  </p>
              </Container>
              <br></br>
              <Container className="ContainerBody" fluid>
                <Container className="ContainerDetails">
                  <Row>
                    <Col xl="6" lg="6" md="6" sm="12">
                      <Form.Text className="text-muted">Nome: </Form.Text>
                      <Form.Control
                        bsPrefix="inputName"
                        className="inputName"
                        readOnly
                        defaultValue={dragon.name}
                        disabled
                      />
                    </Col>
                    <Col xl="6" lg="6" md="6" sm="12">
                      <Form.Text className="text-muted">Data de cadastro: </Form.Text>
                      <Form.Control
                        bsPrefix="inputName"
                        className="inputName"
                        readOnly
                        defaultValue={dragon.createdAt}
                        disabled
                      />
                    </Col>
                  </Row>
                  <br></br>
                  <Row>
                    <Col xl="6" lg="6" md="6" sm="12">
                      <Form.Text className="text-muted">Tipo: </Form.Text>
                      <Form.Control
                        bsPrefix="inputName"
                        className="inputName"
                        readOnly
                        defaultValue={dragon.type}
                        disabled
                      />
                    </Col>
                  </Row>
                  <br></br>
                  <Row>
                    <Col>
                      <Form.Text className="text-muted">Historia: </Form.Text>
                      <Form.Control
                        bsPrefix="inputName"
                        className="inputName"
                        as="textarea"
                        rows="6"
                        readOnly
                        value={dragon.histories}
                        disabled
                      />
                    </Col>
                  </Row>
                </Container>
              </Container>
              <FooterBar />
            </Container>
          </div>
        )  
    }
}

export default withRouter(Dragon)