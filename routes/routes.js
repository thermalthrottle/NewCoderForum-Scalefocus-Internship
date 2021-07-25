import express from 'express';
import {  getAllPosts, getPostByID, addPost, updatePost, deletePost } from '../controllers/posts.controller.js';

const router = express.Router();

router.get('/posts', getAllPosts);

router.get('/getPostByID/:_id', getPostByID)

router.post('/addPost', addPost);

router.patch('/updatePost/:_id', updatePost);

router.delete('/deletePost/:_id', deletePost);

export default router;