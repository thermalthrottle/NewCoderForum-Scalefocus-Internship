import mongoose from 'mongoose';
import env from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

//services
import UserService from '../services/users.services.js';

env.config();

export const register = async (req, res) => {
    const {username, password, email} = req.body;
    try {
        if(Object.keys(req.body).length < 3){
            res.status(400).json({"message":"Not enough information provided!"});
            return;
        }
        const foundUser = await UserService.findUserByUsername(username, email);
        if(foundUser){
            res.status(400).json({"message":"User with such username or E-Mail already exists!"});
            return;
        }
        await UserService.addUser(username, password, email);
        res.status(200).json({"message":"User registered successfully!"});
    } catch (error) {
        res.status(400).json(error);
    }
}


export const login = async (req, res) => {
    const {username, email, password} = req.body;
    try {
        const foundUser = await UserService.findUserByUsernameORPassword(username, email);
        if(Object.keys(req.body).length < 2){
            res.status(400).json({"message":"Not enough information provided!"});
            return;
        }
        if(!foundUser) {
            res.status(400).json({"message":"User not found!"});
            return;
        }
        const result = await bcrypt.compare(password, foundUser.password);
        if (!result) {
            res.status(400).json({"message": "Wrong password!"});
            return;
        }
        const token = jwt.sign(foundUser.toObject(), process.env.ACCESS_TOKEN_SECRET);
        res.status(200).json({token});
    } catch (error) {
        res.status(400).json({"error":error});
    }
}

export const getUserByID = async (req, res) => {
    const _id = req.params._id;
    try {
        if(_id.length < 24)
        {
            res.status(400).json({"message":"Invalid ID format!"});
            return;
        }
        const foundUser = await UserService.findUserByID(_id);
        if (Object.keys(foundUser).length === 0) {
            res.status(400).json({"message":"No user with this ID found!"});
            return;
        }
        res.status(200).json({"user":foundUser});
    } catch (error) {
        res.status(400).json({"error":error});
    }
}

export const updateUser = async (req, res) => {
    const _id = req.params._id;
    const updatedUser = req.body;
    const tokenUser = req.user;
    try {
        if(_id.length < 24)
        {
            res.status(400).json({"message":"Invalid ID format!"});
            return;
        }
        if(tokenUser._id != _id){
            res.status(400).json({"message":"Can't edit the user unless it's you!"})
            return;
        }
        if (Object.keys(updatedUser).length === 0) {
            res.status(400).json({"message":"Not enough information to update!"});
            return;
        }
        await UserService.updateUser(_id, updatedUser);
        res.status(200).json({"message":"User updated successfully!"});                                                        
    } catch (error) {
        res.status(400).json({"error": error});
    }
}

export const deleteUser = async (req, res) => {
    const _id = req.params._id;
    const tokenUser = req.user;
    try {
        if(_id.length < 24)
        {
            res.status(400).json({"message":"Invalid ID format!"});
            return;
        }
        if(tokenUser._id != _id){
            res.status(400).json({"message":"Can't edit the user unless it's you!"})
            return;
        }
        await UserService.deleteUser(_id);
        res.status(200).json({"message":"User deleted successfully!"});
    } catch (error) {
        res.status(400).json({"error":error});
    }
}

export const AuthenticateToken = async (req, res, next) => {
    const token = req.headers["auth-token"];
    if(token === null || token === undefined) {
        res.status(401).json({"message":"Empty token!"});
    }
    await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>{
        if (err) {
            
            res.status(403).json({"message":"Token Error"});
        }
        req.user = user;
        next();
    });
}