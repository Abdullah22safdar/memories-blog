import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();

        res.status(200).json(postMessages);
    } catch (e) {
        res.status(404).json({message: e});
    }
}
export const createPosts = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()});

    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (e) {
        res.status(409).json({message: e.message});
    }
}

export const updatePost = async (req, res) => {
    const {id: _id} = req.params;
    console.log(_id)
    const postData = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    const updateData = await PostMessage.findByIdAndUpdate(_id, {...postData, _id}, {new: true})
    res.json(updateData);

}

export const deletePost = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    await PostMessage.findByIdAndRemove(id);
    res.json({message: 'Post deleted Successfully'});
}

export const likePost = async (req, res) => {
    const {id} = req.params;
    if(!req.userId)  return res.json({message:'Unauthenticated'});
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
    const post = await PostMessage.findById(id);
    const index = post.like.findIndex((id)=> id=== String(req.userId));
    if(index === -1){
        post.like.push(req.userId);
    }else {
        post.like = post.like.filter((id)=> id!== String(req.userId));
    }

    const updatePost = await PostMessage.findByIdAndUpdate(id, post, {new: true});
    res.json(updatePost)
}