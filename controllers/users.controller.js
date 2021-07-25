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