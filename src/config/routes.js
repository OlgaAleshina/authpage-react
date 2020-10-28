import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";

export const routes = [{
    path:"/",
    exact: true,
    protected: true,
    redirect: "/home",
    
},
{ 
    path: "/login",
exact: true,
protected: false,
component: Login,

},
{
    path: "/register",
    exact: true,
    protected: false,
    component: Register,
    
},
{ 
    path: '/home',
exact: true,
protected: true,
component: Home,

}
];

export default routes;


