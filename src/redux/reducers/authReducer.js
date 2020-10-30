import { SET_IS_AUTH } from '../actions/constants';


function authReducer(state = [], action) {
    switch (action.type) {
        case SET_IS_AUTH:
            return {
                user: { isAuthentificated: true }
            };


        default:
            return state;
    }
}

export default authReducer;
