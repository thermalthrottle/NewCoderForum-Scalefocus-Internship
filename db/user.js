import mongoose from 'mongoose';

const User = mongoose.model('Users', new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
}));

export default User;