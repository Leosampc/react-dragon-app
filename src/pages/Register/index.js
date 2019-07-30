import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import './styles.css';

import HeaderBar from '../../components/HeaderBar'
import FooterBar from '../../components/FooterBar'
import api from "../../services/api"


class Register extends Component {
  state = {
    name : "",
    type : "",
    histories : "",
    error: ""
  }
    handleSubmit = async e => {
      e.preventDefault()
      const { name, type, histories } = this.state
      if(name.length > 3 && type !== "") {
        try {
          await api.post("/dragon", { name, type, histories });
          this.props.history.push("/home");
        } catch (err) {
          console.log(err);
          this.setState({ error: "Ocorreu um erro ao cadastrar o dragao, tente novamente mais tarde." });
        }
      } else {
        this.setState({ error: "Um ou mais campos preenchidos incorretamente, favor revisar." })
      }
    }

    render() {
        return (
          <div className="divAll">
            <HeaderBar />
            <div className="hrDiv"></div>
            <div className="hrDiv"></div>
            <Container className="bg-custom-danger bodyContainer" fluid>
              <Container className="text-center">
                  <h1>Cadastro</h1>
                  <p>
                      Abaixo temos um formulario para efetuar o cadastro de um dragao.
                  </p>
              </Container>
              <br></br>
              <Container className="ContainerBody" fluid>
                <Container className="ContainerForm">
                  <Form onSubmit={this.handleSubmit}>
                    <Row>
                      <Col>
                      <Form.Control 
                        bsPrefix="inputName" 
                        type="text" 
                        className="inputName" 
                        as="input" 
                        placeholder="Nome" 
                        onChange={e => this.setState({ name: e.target.value }) }  
                      />
                      </Col>
                      <Col>
                        <Form.Control
                          as="select" 
                          bsPrefix="inputName" 
                          className="inputName"
                          defaultValue="0"
                          onChange={e => this.setState({ type: e.target.value })}
                        >
                          <option value="0" disabled>Selecione um tipo...</option>
                          <option value="ar">Ar</option>
                          <option value="agua">Agua</option>
                          <option value="gelo">Gelo</option>
                          <option value="fogo">Fogo</option>
                          <option value="terra">Terra</option>
                          <option value="trovao">Trovão</option>
                          <option value="veneno">Veneno</option>
                        </Form.Control>
                      </Col>
                    </Row>
                    <br></br>
                    <Row>
                      <Col>
                        <Form.Control
                          bsPrefix="inputName" 
                          className="inputName" 
                          placeholder="Descreva a historia do dragao" 
                          as="textarea" 
                          rows="6"
                          onChange={e => this.setState({ histories: e.target.value }) }
                        />
                      </Col>
                    </Row>
                    <br></br>
                    <Button type="submit" variant="custom-btn">Cadastrar</Button>
                    {this.state.error && <p className="pError" >{this.state.error}</p>}
                  </Form>
                </Container>
              </Container>
              <FooterBar />
            </Container>
          </div>
        )  
    }
}

export default withRouter(Register)