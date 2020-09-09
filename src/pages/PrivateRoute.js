import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

// Pasamos los Children (Dashboard) + Todas las Props!
const PrivateRoute = ({ children, ...rest }) => {
  const { isAuthenticated, user } = useAuth0();
  const isUser = isAuthenticated && user;
  // SI TRUE: Devuelve los Children (dashboard mas todo el web)
  // FALSE: Devuelve al Log In
  return (
    <Route
      {...rest}
      render={() => {
        return isUser ? children : <Redirect to='login'></Redirect>;
      }}
    ></Route>
  );
};
export default PrivateRoute;
