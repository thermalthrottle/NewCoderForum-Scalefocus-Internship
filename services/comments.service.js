import mongoose from mongoose;

import Comments from '../db/comments.js';

export default class commentService {

    constructor(){}

    static getCommentByID = async (id) => {
        const _id = mongoose.Types.ObjectId(id);
        return await Comments.findOne({_id});
    }

    static getCommentsByPostID = async (postID) => {
        const postAttached = mongoose.Types.ObjectId(postID);
        return await Comments.find({postAttached});
    }

    static getCommentsByAuthorID = async (authorID) => {
        const author = mongoose.Types.ObjectId(authorID);
        return await Comments.find({author});
    }

    static saveComment = async (title, text, postAttached, author) => {
        const commentToSave = new Comments({tite, text, postAttached, author})
        return await commentToSave.save();
    }

    static updateComment = async (postID, updatedCommentBody) => {
        const _id = mongoose.Types.ObjectId(postID);
        return await Comments.updateOne({_id}, updatedCommentBody);
    }

    static deleteComment = async (id) => {
        const _id = mongoose.Types.ObjectId(id);
        return await Comments.deleteOne({_id});
    }
}