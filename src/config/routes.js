import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { UserList } from "../pages/UserList";

export const routes = [{
    path: "/",
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
    path: '/userlist',
    exact: true,
    protected: true,
    component: UserList,

}
];

export default routes;


