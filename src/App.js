import { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import routes from "./config/routes.js";
import { useSelector } from "react-redux";
import PrivateRoute from "./config/privateRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";


function App() {

  const isAuth = useSelector(state => state.user.isAuthentificated);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    localStorage.getItem('token') ? setHasToken(true) : setHasToken(false)
  }, []);


  return (
    <Container className="text-center">

      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <PrivateRoute exact path="/home">
          <Home />
        </PrivateRoute>}
      </Switch>



    </Container>
  );
}

export default App;

/*
<Switch>
        <Route exact path="/">
          <Redirect to={'/home'} />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <PrivateRoute exact path="/home">
          <Home />
        </PrivateRoute>
  </Switch>


<Switch>{routes.map(route => <Route
        path={route.path}
        exact={route.exact}
        render={(props) =>
          route.redirect ? <Redirect to={route.redirect} /> :
            route.protected ? (
              hasToken || isAuth ? route.component &&
                <route.component {...props} routes={route.routes} /> : <Redirect to='/login' />
            ) : route.component && <route.component {...props} routes={route.routes} />
        } />)}
      </Switch>
      */