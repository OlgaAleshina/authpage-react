import { createStore } from "redux";
import authReducer from "./authReducer";


const initialState = {
    user: {
        isAuthentificated: false
    }

};

/*const reducer = combineReducers({
    user: authReducer,
});*/

const store = createStore(authReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default store;

