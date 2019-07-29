import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import { isAuthenticated } from "./services/auth"

import Login from "./pages/Login"
import Home from "./pages/Home"

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route 
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
)

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <PrivateRoute exact path="/home" component={Home} />
      <PrivateRoute path="/home/register" component={() => <h1>Cadastro</h1>} />
      <PrivateRoute path="/home/dragon" component={() => <h1>Dragao</h1>} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
)

export default Routes