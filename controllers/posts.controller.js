//outside modules
import mongoose from 'mongoose';

//entities
import Posts from '../db/posts.js';

//services
import PostService from '../services/post.service.js';

export const getAllPosts = async (req, res) => {
    try {
        const allPosts = await PostService.getAllPosts();
        res.status(200).json(allPosts);
    } catch (error) {
        res.status(404).json(error);
    }
}
      
export const getPostByID = async (req, res) => {
    const {_id} = mongoose.Types.ObjectId(req.params._id);
    try {
        const post = await Posts.find({_id});
        res.status(200).json(post);
    } catch ({error}) {
        res.status(400).json({error});
    }
}

export const addPost = async (req, res) => {
    const {title, text} = req.body;
    const newPost = new Posts({title, text});
    try {
        console.log("here");
        const postToReturn = await PostService.savePost(newPost);
        res.status(201).json(postToReturn);
    } catch (error) {
        
        console.log("catch");
        res.status(400).json(error);
    }
}

export const updatePost = async (req, res) => {
    const {_id} = mongoose.Types.ObjectId(req.params._id);
    const updatedPost = req.body;

    if (Object.keys(req.body).length === 0) {
        res.status(400).json({"message": "The body is empty!"});
    }
    try {
        const postUpdate = await Posts.updateOne({_id}, updatedPost);
        res.status(200).json("Updated successfully!");    
    } catch ({error}) {
        res.status(400).json({error});
    }
}

export const deletePost = async (req, res) => {
    const {_id} = mongoose.Types.ObjectId(req.params._id);
    try {
        await Posts.deleteOne({_id});
        res.status(200).json({"message": "Post deleted successfully"})
    } catch ({error}) {
        res.status(400).json({error})
    }
}