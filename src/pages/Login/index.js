import React, { Component } from "react"
import { withRouter } from "react-router-dom"

import Logo from "../../assets/dragon-logo.png";
import { login } from "../../services/auth" //método de login (gera o localStorage = session) da nossa aplicação

import { Form, Container } from "./styles"

class Login extends Component {
  state = {
    username : "",
    password : "",
    error    : ""
  }

  handleLogin = e => { //método que é chamado ao tentar logar-se no sistema
    e.preventDefault() //pausa o submit do form
    const { username, password } = this.state
    if(!username || !password) { //caso algum dos parâmetros esteja inválido
      this.setState({ error: "Preencha o usuario e a senha para continuar!" })
    } else { //caso contrário
      if(username.toLowerCase() === "dragon" && password === "dragon@123") { //credênciais de login estáticas
        login(username) //chama o método que cria a sessão
        this.props.history.push("/home") //redireciona para a /home
      } else { //caso as credênciais estejam erradas
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