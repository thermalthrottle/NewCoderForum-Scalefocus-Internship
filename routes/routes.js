//outside modules
import express from 'express';

//controllers
import {  getAllPosts, getPostByID, addPost, updatePost, deletePost } from '../controllers/posts.controller.js';
import { register, login, updateUser, deleteUser, AuthenticateToken } from '../controllers/users.controller.js';

const router = express.Router();

router.get('/posts', AuthenticateToken, getAllPosts);

router.get('/getPostByID/:_id', AuthenticateToken, getPostByID)

router.post('/addPost', AuthenticateToken, addPost);

router.patch('/updatePost/:_id', AuthenticateToken, updatePost);

router.delete('/deletePost/:_id', AuthenticateToken, deletePost);

router.post('/register', register);

router.get('/login', login);

// router.get('/getUserByID/:_id')

router.patch('/updateUser/:_id', AuthenticateToken, updateUser);

router.delete('/deleteUser/:_id', AuthenticateToken, deleteUser);

export default router;