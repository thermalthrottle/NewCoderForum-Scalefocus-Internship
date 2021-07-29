//outside modules
import { json } from 'express';
import mongoose from 'mongoose';

//entities
import Posts from '../db/posts.js';

//services
import PostService from '../services/posts.service.js';

export const getAllPosts = async (req, res) => {
    try {
        const allPosts = await PostService.getAllPosts();
        res.status(200).json(allPosts);
    } catch (error) {
        res.status(404).json(error);
    }
}
      
export const getPostByID = async (req, res) => {
    const _id = req.params._id;
    try {
        const post = await PostService.getPostByID(_id);
        if (Object.keys(post).length === 0) {
            res.status(400).json({"message":"Post not found!"});
            return;
        }
        res.status(200).json(post);
    } catch ({error}) {
        res.status(400).json({error});
    }
}

export const addPost = async (req, res) => {
    const {title, text} = req.body;
    const author = req.user._id;
    try {
        if (Object.keys(req.body).length === 0) {
            res.status(400).json({"message":"Body can't be empty!"});
        }
        const newPost = new Posts({title, text, author});
        const postToAdd = await PostService.savePost(newPost);
        res.status(200).json(postToAdd);
    } catch (error) {
        res.status(400).json(error);
    }
}

export const updatePost = async (req, res) => {
    const _id = req.params._id;
    const updatedPost = req.body;
    const tokenUser = req.user;
    try {
        const foundPost = await PostService.getPostByID(_id);
        if(tokenUser._id != foundPost.author){
            res.status(400).json({"message":"Can't edit the post, unless you are the author!"})
            return;
        }
        if (Object.keys(req.body).length === 0) {
            res.status(400).json({"message": "The body is empty!"});
            return;
        }
        await PostService.updatePost(_id, updatedPost);
        res.status(200).json({"message":"Updated successfully!"});    
    } catch ({error}) {
        res.status(400).json({error});
    }
}

export const deletePost = async (req, res) => {
    const _id = req.params._id;
    const tokenUser = req.user;
    try {
        const foundPost = await PostService.getPostByID(_id);
        if (!foundPost) {
            res.status(400).json({"message":"Post not found"});
            return;
        }
        if (tokenUser._id != foundPost.author) {
            res.status(400).json({"message":"Can't edit the post, unless you are the author!"})
            return;
        }
        await PostService.deletePost(_id);
        res.status(200).json({"message": "Post deleted successfully"})
    } catch (error) {
        res.status(400).json({error})
    }
}