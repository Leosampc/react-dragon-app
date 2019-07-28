import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"

import Logo from "../../assets/dragon-logo.png";
import api from "../../services/api"
import { login } from "../../services/auth"

import { Form, Container } from "./styles"

class Login extends Component {
  state = {
    username : "",
    password : "",
    error    : ""
  }

  handleLogin = e => {
    e.preventDefault()
    const { username, password } = this.state
    if(!username || !password) {
      this.setState({ error: "Preencha o usuario e a senha para continuar!" })
    } else {
      if(username.toLowerCase() === "dragon" && password === "dragon@123") {
        login(username)
        this.props.history.push("/app")
      } else {
        this.setState({ error: "Houve um problema com o login, verifique suas credenciais." })
      }
    }
  }

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleLogin} >
          <img src={Logo} alt="Dragon Logo" />
          {this.state.error && <p>{this.state.error}</p>}
          <input 
            type="text"
            placeholder="Nome de usuario"
            onChange={e => this.setState({ username: e.target.value })}
          />
          <input 
            type="password"
            placeholder="Senha"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <button type="submit">Entrar</button>
        </Form>
      </Container>
    )
  }
}

export default withRouter(Login)