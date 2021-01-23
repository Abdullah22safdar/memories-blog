import axios from 'axios';

const url = 'http://localhost:5000/posts';

export const fetchPosts = () => axios.get(url);

export const createPosts = (postData) => axios.post(url, postData);

export const updatePosts = (postData, currentID) => axios.patch(`${url}/${currentID}`, postData)

export const deletePost = (id) => axios.delete(`${url}/${id}`);

export const likePost = (id) => axios.patch(`${url}/${id}/likeCount`);