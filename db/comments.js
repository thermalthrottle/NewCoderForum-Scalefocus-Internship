import mongoose from 'mongoose';

const Comments = mongoose.model('Comments', new mongoose.Schema({
    postAttached: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Posts'
    },
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
}));

export default Comments;