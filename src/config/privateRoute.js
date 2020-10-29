import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";


function PrivateRoute({ children, ...rest }) {
  const isAuth = useSelector(state => state.user.isAuthentificated);
  console.log(isAuth)
  //const isAuthenticated = false;

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuth ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}

export default PrivateRoute;

