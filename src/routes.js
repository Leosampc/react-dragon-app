import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import { isAuthenticated } from "./services/auth" //importa o metodo que verifica se o usuario esta autenticado

//Páginas da a plicação
import Login from "./pages/Login"
import Home from "./pages/Home"
import Register from "./pages/Register"
import Dragon from "./pages/Dragon"

//Rotas privadas = só podem ser acessadas conforme as condições abaixo
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route 
    {...rest}
    render={props =>
      isAuthenticated() ? ( //Caso o usuário esteja autenticado, permite renderizar o componente privado
        <Component {...props} />
      ) : (//caso contrário
        <Redirect to={{ pathname: "/", state: { from: props.location } }} /> //redireciona para a página de login
      )
    }
  />
)

//Rotas da nossa aplicação
const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <PrivateRoute exact path="/home" component={Home} />
      <PrivateRoute path="/dragon/register" component={Register} />
      <PrivateRoute path="/dragon/see/:id" component={Dragon} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
)

export default Routes