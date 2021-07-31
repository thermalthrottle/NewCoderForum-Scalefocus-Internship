import CommentService from '../services/comments.service.js';
import PostService from '../services/posts.service.js';

export const addComment = async (req, res) => {
    const postID = req.params.postID;
    const {title, text} = req.body;
    const tokenUser = req.user;
    try {
        if (postID.length < 24) {
            res.status(400).json({"message":"Invalid ID Format!"});
            return;
        }
        const postToAttach = await PostService.getPostByID(postID);
        if (!postToAttach) {
            res.status(400).json({"message":"Can't find post with this ID!"});
            return;
        }
        CommentService.saveComment(title, text, postToAttach, tokenUser);
        res.status(200).json({"message":"Comment added successfully"});
    } catch (error) {
        res.status(400).json({error});
    }
}

export const getCommentByID = async (req, res) => {
    try {
        const _id = req.params._id;
        if (_id.length < 24) {
            res.status(400).json({"message":"Invalid ID Format!"});
            return;
        }
        const comment = await CommentService.getCommentByID(_id);
        res.status(200).json(comment);
    } catch (error) {
        res.status(400).json({error});
    }
}

export const getCommentsByPostID = async (req, res) => {
    const postID = req.params.postID;
    try {
        if (postID.length < 24) {
            res.status(400).json({"message":"Invalid ID Format!"});
            return;
        }
        const comments = await CommentService.getCommentsByPostID(postID);
        res.status(200).json(comments);
    } catch (error) {
        res.status(400).json({error});
    }
}

export const getCommentsByAuthorID = async (req, res) => {
    const authorID = req.params.authorID;
    try {
        if (authorID.length < 24) {
            res.status(400).json({"message":"Invalid ID Format!"});
            return;
        }
        const comments = await CommentService.getCommentsByAuthorID(authorID);
        res.status(200).json(comments);
    } catch (error) {
        res.status(400).json({error});
    }
}

export const updateComment = async (req, res) => {
    const commentID = req.params._id;
    const {title, text} = req.body;
    const tokenUser = req.user;
    try {
        if (commentID.length < 24) {
            res.status(400).json({"message":"Invalid ID Format!"});
            return;
        }
        const foundComment = await CommentService.getCommentByID(commentID);
        if (!foundComment) {
            res.status(400).json({"message":"No comment with such ID found!"});
            return;
        }
        if (tokenUser._id === foundComment.author) {
            res.status(400).json({"message":"You are not the author of the comment!"});
            return;
        }
        await CommentService.updateComment(commentID, title, text);
        res.status(200).json({"message":"Comment updated successfully!"});
    } catch (error) {
        res.status(400).json({error});
    }
}

export const deleteComment = async (req, res) => {
    try {
        const commentID = req.params._id;
        const tokenUser = req.user;
        if (commentID.length < 24) {
            res.status(400).json({"message":"Invalid ID Format!"});
            return;
        }
        const foundComment = await CommentService.getCommentByID(commentID);
        if (!foundComment) {
            res.status(400).json({"message":"No comment with such ID found!"});
            return;
        }
        if (tokenUser._id === foundComment.author) {
            res.status(400).json({"message":"You are not the author of the comment!"});
            return;
        }
        await CommentService.deleteComment(commentID);
        res.status(200).json({"message":"Comment deleted successfully!"});
    } catch (error) {
        res.status(400).json({error});
    }
}