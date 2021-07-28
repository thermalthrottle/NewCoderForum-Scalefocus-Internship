import Posts from '../db/posts.js';

export default class postService{

    constructor(){
    }

    static getAllPosts = async () => {
        return await Posts.find();
    }

    static savePost = async (postToSave) => {
        return await postToSave.save();
    }


}