import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ loggedIn, ...props }) => {
  return loggedIn ? <Route {...props} /> : <Redirect to='/sign-in' />
}

export default ProtectedRoute;

//из App удалила из свичей <Route>
// {loggedIn ? <Redirect to='/' /> : <Redirect to='/sign-in' />}
// </Route>