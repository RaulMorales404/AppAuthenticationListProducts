import React, { createContext, useEffect, useReducer } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginData, LoginResponse, RegisterData, Usuario } from '../interfaces/LoginResponse';
import { AuthReducer, AuthState } from "./AuthReducer";
import cafeApi from "../apis/cafeApi";


type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: Usuario | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    singUp: (singUp: RegisterData) => void;
    singIn: (loginData: LoginData) => void;
    logOut: () => void;
    removeMessage: () => void;
}

export const AuthContext = createContext({} as AuthContextProps);

const authInicialState: AuthState = {
    status: 'checking',
    token: null,
    user: null,
    errorMessage: '',


}

export const ProviderAuth = ({ children }: any) => {

    const [state, dispatch] = useReducer(AuthReducer, authInicialState);

    const singIn = async ({ correo, password }: LoginData) => {
        try {
            const { data } = await cafeApi.post<LoginResponse>('/auth/login', {
                correo, password
            })
            dispatch({
                type: 'signUp', payload: {
                    token: data.token,
                    user: data.usuario,
                }
            });
            await AsyncStorage.setItem('token', data.token);

        } catch (error: any) {
            console.log(error.response.data.msg);
            dispatch({
                type: 'addError',
                payload: error.response.data.msg || 'Informacion Incorrecta'
            })
        }

    };

    const readSyncStorage = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            ///si no tienes token 
            if (!token) return dispatch({ type: 'notAutenticated' });

            //si tienes token 
            const resp = await cafeApi.get('/auth');

            if (resp.status !== 200) return dispatch({ type: 'notAutenticated' });
            await AsyncStorage.setItem('token', resp.data.token);
            dispatch({
                type: 'signUp', payload: {
                    token: resp.data.token,
                    user: resp.data.usuario,
                }
            });

        } catch (e) {
            // error reading value
        }

    }

    const singUp = async ({ name, email, password }: RegisterData) => {

        try {
            const { data } = await cafeApi.post<LoginResponse>('/usuarios/', {
                nombre: name,
                correo: email,
                password
            })
            dispatch({
                type: 'signUp', payload: {
                    token: data.token,
                    user: data.usuario,
                }
            });
            await AsyncStorage.setItem('token', data.token);

        } catch (error: any) {
        
            dispatch({
                type: 'addError',
                payload: error.response.data.errors[0]['msg'] || 'Informacion Incorrecta'
            })
        }

        // try {
        //     const {data} = await cafeApi.post<LoginResponse>('/usuarios/', {
        //         nombre: name,
        //         correo: email,
        //         password
        //     });
        //     dispatch({
        //         type: 'signUp', payload: {
        //             token: data.token,
        //             user: data.usuario,
        //         }
        //     });
        //     await AsyncStorage.setItem('token',data.token);
        // }catch (error) {
        //     console.log(error);
        //     dispatch({
        //         type: 'addError',
        //         payload: error.response.data.msg || 'Informacion Incorrecta'
        //     })
        // }

    };

    const logOut = async () => {
        await AsyncStorage.removeItem('token');
        dispatch({ type: 'logOut' });
    };

    const removeMessage = () => {
        dispatch({ type: 'removeError' });
    };

    useEffect(() => {
        readSyncStorage();
    }, [])

    return (
        <AuthContext.Provider
            value={{
                ...state,
                singUp,
                singIn,
                logOut,
                removeMessage,
            }}>
            {children}
        </AuthContext.Provider>

    )
}

