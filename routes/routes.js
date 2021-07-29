//outside modules
import express from 'express';

//controllers
import {  getAllPosts, getPostByID, addPost, updatePost, deletePost } from '../controllers/posts.controller.js';
import { register, login, getUserByID, updateUser, deleteUser, AuthenticateToken } from '../controllers/users.controller.js';
import { addComment, getCommentByID, getCommentsByPostID, getCommentsByAuthorID, updateComment, deleteComment } from '../controllers/comments.controller.js';

const router = express.Router();

router.get('/posts', AuthenticateToken, getAllPosts);

router.get('/getPostByID/:_id', AuthenticateToken, getPostByID)

router.post('/addPost', AuthenticateToken, addPost);

router.patch('/updatePost/:_id', AuthenticateToken, updatePost);

router.delete('/deletePost/:_id', AuthenticateToken, deletePost);

router.post('/register', register);

router.get('/login', login);

router.get('/getUserByID/:_id', getUserByID)

router.patch('/updateUser/:_id', AuthenticateToken, updateUser);

router.delete('/deleteUser/:_id', AuthenticateToken, deleteUser);

router.get('/comments/:_id', getCommentByID);

router.post('/comments/addComment/:postID/:_id'. AuthenticateToken, addComment);

router.get('/comments/getCommentsByPostID/:postID/', getCommentsByPostID);

router.get('/comments/getCommentsByAuthorID/:authorID', getCommentsByAuthorID);

router.patch('/comments/updateComment/:_id', AuthenticateToken, updateComment);

router.delete('/comments/deleteComment/:_id', AuthenticateToken, deleteComment);

export default router;