import { useEffect, useState } from "react";
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import routes from "./config/routes.js";
import { useSelector } from "react-redux";
import { PrivateRoute } from "./utils/authentification";
import { UserList } from "./pages/UserList";
import { UserCard } from "./pages/UserCard";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";


function App() {

  const isAuth = useSelector(state => state.user.isAuthentificated);
  const [hasToken, setHasToken] = useState(false);


  useEffect(() => {
    localStorage.getItem('token') ? setHasToken(true) : setHasToken(false);
  }, []);

  return (
    <Container className="text-center">

      <Switch>
        <Route exact path="/">
          <Redirect to="/userlist" />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <PrivateRoute exact path="/userlist" isAuthentificated={isAuth || hasToken}>
          <UserList />
        </PrivateRoute>
        <PrivateRoute path="/userlist/:id" isAuthentificated={isAuth || hasToken}>
          <UserCard />
        </PrivateRoute>
      </Switch>


    </Container>
  );
}

export default App;

