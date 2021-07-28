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
        await UserService.addUser(username, password, email);
        res.status(200).json({"message":"User registered successfully!"});
    } catch (error) {
        res.status(400).json(error);
    }
}


export const login = async (req, res) => {
    const {username, password} = req.body;

    try {
        const foundUser = await UserService.findUserByUsername(username);
        if(!foundUser) {
            res.status(400).json({"message":"User not found!"});
        }
        const result = await bcrypt.compare(password, foundUser.password);
        if (!result) {
            res.status(400).json({"message": "Wrong password!"});
        }
        else{
            const token = jwt.sign(foundUser.toObject(), process.env.ACCESS_TOKEN_SECRET);
            res.status(200).json({token});
        }
    } catch (error) {
        res.status(400).json({"error":error});
    }
}

export const findUserByID = (req, res) => {
    // const {_id} = 
}

export const updateUser = async (req, res) => {
    const _id = req.params._id;
    try {
        const updatedUser = req.body;
        if(req.user._id != _id){
            console.log(_id);
            res.status(403).json({"message":"Can't edit the user unless it's you!"})
        }
        if (Object.keys(updatedUser).length === 0) {
            res.status(403).json({"message":"No information to update!"});
        } else {
            await UserService.updateUser(_id, updatedUser);
            res.status(200).json({"message":"User updated successfully!"});  
        }                                                                  
    } catch (error) {
        res.status(400).json({"error": error});
    }
}

export const deleteUser = (req, res) => {
    const _id = req.params._id;
    try {
        
    } catch (error) {
        
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