import mongoose from 'mongoose';

const postsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Users'
    },
    text: {
        type: String,
        require: true
    }
});

const Posts = mongoose.model('Posts', postsSchema);

export default Posts;