import { SET_IS_AUTH } from '../actions/constants';


export function authReducer(state = [], action) {
    switch (action.type) {
        case SET_IS_AUTH:
            return {
                user: {
                    isAuthentificated: true,
                    token: action.token
                }
            };


        default:
            return state;
    }
};
