import mongoose from 'mongoose';
import env from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import User from '../db/user.js';

env.config();

// import Posts from '../db/posts.js';

export const register = (req, res) => {
    const {username, password, email} = req.body;
    
    try {
        bcrypt.genSalt(12, (error, salt) => {
            bcrypt.hash(password, salt, (error, password) => {
                var newUser = new User({username, password, email});
                newUser.save();
                res.status(200).json({"message":"User registered successfully!"})
            });
        });
    } catch ({error}) {
        res.status(400).json({error})
    }
}

export const login = async (req, res) => {
    const {username, password} = req.body;

    try {
        const foundUser = await User.findOne({username});
        if(!foundUser) {
            res.status(400).json({"message":"User not found!"});
        }
        bcrypt.compare(password, foundUser.password, (error, result) => {
            if (result) {
                const token = jwt.sign(foundUser.toObject(), process.env.ACCESS_TOKEN_SECRET);
                res.status(200).json({token});
            }
            res.status(400).json({"message": "Wrong password!"});
        });
    } catch ({error}) {
        res.status(400).json({error});
    }
}

export const AuthenticateToken = (req, res, next) => {
    const authHeader = req.headers['authToken'];
    console.log(authHeader);
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null || token == undefined) {
        res.status(401).json({"message":"Empty token!"});
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, ({err}, user) =>{
        if ({err}) {
            res.status(403).json({err});
        }

        req.user = user;
        next();
    });
}