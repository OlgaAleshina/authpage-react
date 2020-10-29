import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";


function PrivateRoute({ children, ...rest }) {
  const isAuth = useSelector(state => state.user.isAuthentificated);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    localStorage.getItem('token') ? setHasToken(true) : setHasToken(false)
  }, []);


  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuth || hasToken ? (
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

