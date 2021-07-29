import mongoose from 'mongoose';

import Posts from '../db/posts.js';

export default class postService{

    constructor(){
    }

    static getAllPosts = async () => {
        return await Posts.find();
    }

    static getPostByID = async (_id) => {
        _id = mongoose.Types.ObjectId(_id);
        return await Posts.findOne({_id});
    }

    static savePost = async (postToSave) => {
        return await postToSave.save();
    }

    static updatePost = async (id, updatedPost) => {
        const _id = mongoose.Types.ObjectId(id);
        return await Posts.updateOne({_id}, updatedPost);
    }

    static deletePost = async (id) => {
        const _id = mongoose.Types.ObjectId(id);
        return await Posts.deleteOne({_id})
    }
}