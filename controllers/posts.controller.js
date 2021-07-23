import mongoose from 'mongoose';

import Posts from '../db/posts.js';

export const getAllPosts = async (req, res) => {
    try {
        const allPosts = await Posts.find();
        res.status(200).json(allPosts);
    } catch (error) {
        res.status(404).json( {message: "Uh oh, error"} );
    }
}
      
export const getPostByID = async (req, res) => {
    const {_id} = mongoose.Types.ObjectId(req.params._id);
    try {
        const post = await Posts.find({_id});
        res.status(200).json(post);
    } catch ({message}) {
        res.status(400).json({message});
    }
}

export const addPost = async (req, res) => {
    const {title, text} = req.body;
    const newPost = new Posts({title, text});
    try {
        await newPost.save();  
        res.status(201).json(newPost);
    } catch ({message}) {
        res.status(400).json({message});
    }
}
