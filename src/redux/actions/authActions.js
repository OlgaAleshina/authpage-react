import { SET_IS_AUTH } from './constants';

export function setIsAuth(token) {
    return {
        type: SET_IS_AUTH,
        token
    };
}

