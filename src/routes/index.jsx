import React from 'react';

import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Signin from '../pages/Signin';
import Dashboard from '../pages/Dashboard';
import Post from '../pages/Post';
import Posts from '../pages/Posts';

// import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem('paypost.token');

  return (
    <Route
      {...rest}
      render={props =>
        !!isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/signin", state: { from: props.location } }} />
        )
      }
    />
  )
};

const Routes = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path='/signin' component={Signin} />
          <PrivateRoute exact path='/' component={Dashboard} />
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
          <PrivateRoute exact path='/post' component={Post} />
          <PrivateRoute exact path='/posts' component={Posts} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default Routes;