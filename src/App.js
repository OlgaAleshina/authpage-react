import {useEffect, useState} from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import routes from "./config/routes.js";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import PrivateRoute from "./config/privateRoute.js";
import { AuthContext } from "./config/auth.js";




function App() { 
  
  const [authentificated, setIsAuthentificated] = useState(false);
  
  useEffect(() => {   
   localStorage.getItem('token') ? setIsAuthentificated(true) : setIsAuthentificated(false)
}, []);


  
  return (
    <Container className="text-center">
     <AuthContext.Provider value={authentificated}>
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
            
        </AuthContext.Provider>
    </Container>
  );
}

export default App;

/*<Switch>{routes.map(route => <Route
        path={route.path}
        exact={route.exact}
        render={(props) =>
          route.redirect ? <Redirect to={route.redirect}/> :
          route.protected ? (
            authentificated ? route.component &&
              <route.component {...props} routes={route.routes}/> : <Redirect to='/login'/>
          ) : route.component && <route.component {...props} routes={route.routes}/>
          }/>)}
      </Switch>
      
    

      <AuthContext.Provider value={authentificated}>
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
            
        </AuthContext.Provider> 
      */