import * as api from '../api';
import {AUTH, LOGOUT} from "../constants/actionTypes";

export const googleSignIn =(result, token) => async (dispatch) => {
    try {
        dispatch({type: AUTH, data: {result, token}});
    } catch (e) {
        console.log(e)
    }
}

export const logout = ()=> async (dispatch) => {
    try{
        dispatch({type: LOGOUT})
    } catch (e) {
        console.log(e)
    }
}

export const signIn = (formData, history)=> async (dispatch)=>{
    try{
        const {data} = await api.signIn(formData);
        dispatch({type: AUTH, data})
        history.push('/')
    }catch (e) {
        console.log(e)
    }
    
}

export const signUp =(formData, history) => async (dispatch) => {
    try {
        const {data} = await api.signUp(formData);
        dispatch({type: AUTH, data})
        history.push('/');
    } catch (e) {
        console.log(e);
    }
}