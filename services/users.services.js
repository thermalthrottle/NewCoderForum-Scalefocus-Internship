
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
//entities
import User from '../db/user.js';

//

export default class userService{
    
    constructor(){}

    static addUser = async (username, unhashedPassword, email) => {
        const salt = await bcrypt.genSalt(12);
        const password = await bcrypt.hash(unhashedPassword, salt);
        const newUser = new User({username, password, email});
        return await newUser.save();
    }

    static findUserByID = async (_id) => {
        _id = mongoose.Types.ObjectId(_id);
        return await User.find({_id});
    }
    static findUserByUsername = async (username) => {
        const user = User.findOne({username});
        return await user;
    }

    static updateUser = async (_id ,updatedUserBody) => {
        _id = mongoose.Types.ObjectId(_id);
        return await User.updateOne({_id}, updatedUserBody);
    }

    static deleteUser = async (id) => {
        const {_id} = mongoose.Types.ObjectId(id)
        return await User.deleteOne({_id});
    }
}