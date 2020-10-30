import { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";


export const PrivateRoute = ({ children, ...rest }) => {
  const isAuth = useSelector(state => state.user.isAuthentificated);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    localStorage.getItem('token') ? setHasToken(true) : setHasToken(false);
  });

  console.log("hasToken", hasToken)

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



