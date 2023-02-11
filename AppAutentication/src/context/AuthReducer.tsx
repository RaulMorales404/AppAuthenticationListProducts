
import { Usuario } from "../interfaces/LoginResponse";

export interface AuthState {
    status: 'checking' | 'authenticated' | 'not-authenticated';
    token: string | null;
    errorMessage: string;
    user: Usuario | null;
}

type AuthAction =
    | { type: 'signUp', payload: { token: string, user: Usuario } }
    | { type: 'addError', payload: string }
    | { type: 'removeError' }
    | { type: 'notAutenticated' }
    | { type: 'logOut' }

export const AuthReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'addError':
            return {
                ...state,
                user: null,
                status: 'not-authenticated',
                token: null,
                errorMessage: action.payload,
            }

        case "removeError":
            return {
                ...state,
                errorMessage: '',

            }
        case "signUp":
            return {
                ...state,
                errorMessage: '',
                status: 'authenticated',
                user: action.payload.user,
                token: action.payload.token,

            }

        case "logOut":
        case "notAutenticated":
            return {
                ...state,
                errorMessage: "",
                status: 'not-authenticated',
                user: null,
                token: null,
            }

        default:
            return state;
    }

}

