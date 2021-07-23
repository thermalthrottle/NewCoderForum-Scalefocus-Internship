import express from 'express';
import {  getAllPosts, getPostByID, addPost } from '../controllers/posts.controller.js';

const router = express.Router();

router.get('/posts', getAllPosts);

router.get('/getPostByID/:_id', getPostByID)

router.post('/addPost', addPost);


export default router;