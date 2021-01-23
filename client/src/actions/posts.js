import * as api from '../api';
import {CREATE, UPDATE, DELETE, FETCH_ALL, LIKE} from '../constants/actionTypes';

// Action Creators
export const getPosts = () => async (dispatch) => {
    try {
        const {data} = await api.fetchPosts();

        dispatch({type: FETCH_ALL, payload: data});
    } catch (e) {
        console.log(e)
    }
}

export const createPosts = (posts) => async (dispatch) => {
    try {
        const {data} = await api.createPosts(posts);
        const action = {type: CREATE, payload: data}

        dispatch(action);
    } catch (err) {

        console.log(err)
    }
}

export const updatePosts = (posts, currentID) => async (dispatch) => {
    try {
        const {data} = await api.updatePosts(posts, currentID);
        const action = {type: UPDATE, payload: data}

        dispatch(action);
    } catch (err) {

        console.log(err)
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);

        dispatch({type: DELETE, payload: id});
    } catch (e) {
        console.log(e);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const {data} = await api.likePost(id);

        dispatch({type: LIKE, payload: data});
    } catch (e) {
        console.log(e)
    }
}