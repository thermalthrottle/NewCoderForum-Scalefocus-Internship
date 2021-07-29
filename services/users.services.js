
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

    static findUserByUsernameORPassword = async (username, email) => {
        return await User.findOne({$or : [{username}, {email}]});;
    }

    static updateUser = async (_id, updatedUser) => {
        _id = mongoose.Types.ObjectId(_id);
        const salt = await bcrypt.genSalt(12);
        updatedUser.password = await bcrypt.hash(updatedUser.password, salt);
        return await User.updateOne({_id}, updatedUser);
    }

    static deleteUser = async (id) => {
        const {_id} = mongoose.Types.ObjectId(id)
        return await User.deleteOne({_id});
    }
}