import {useEffect, useState} from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import routes from "./config/routes.js";



function App() {

  const [authenticated, setIsAuthentificated] = useState(false)


 useEffect(() => {
      localStorage.getItem('token') ? setIsAuthentificated(true) : setIsAuthentificated(false)
  }, []);
 
  
  return (
    <Container className="text-center">
     
     <Switch>{routes.map(route => <Route
        path={route.path}
        exact={route.exact}
        render={(props) =>
          route.redirect ? <Redirect to={route.redirect}/> :
          route.protected ? (
            authenticated ? route.component &&
              <route.component {...props} routes={route.routes}/> : <Redirect to='/login'/>
          ) : route.component && <route.component {...props} routes={route.routes}/>
          }/>)}
      </Switch>
            
       
    </Container>
  );
}

export default App;
/*   <Switch>  

<Route path="/">
  <Login />
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

</Switch>*/
