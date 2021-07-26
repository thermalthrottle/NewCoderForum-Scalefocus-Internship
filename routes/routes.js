//outside modules
import express from 'express';

//controllers
import {  getAllPosts, getPostByID, addPost, updatePost, deletePost } from '../controllers/posts.controller.js';
import { register, login, AuthenticateToken } from '../controllers/users.controller.js';

const router = express.Router();

router.get('/posts', AuthenticateToken, getAllPosts);

router.get('/getPostByID/:_id', getPostByID)

router.post('/addPost', addPost);

router.patch('/updatePost/:_id', updatePost);

router.delete('/deletePost/:_id', deletePost);

router.post('/register', register);

router.post('/login', login);

export default router;