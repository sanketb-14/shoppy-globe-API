import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import { promisify } from 'util';

// Creates a JWT token for a given user ID
const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

// Sends a JWT token and user data in the response
const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token ,
        data:{
            user
        }
    })
}

// Registers a new user
export const registerUser = async(req,res) => {
    try {
        const {fullName, email, password, passwordConfirm} = req.body;

        if(!fullName || !email || !password || !passwordConfirm){
            return res.status(400).json({
                status: 'error',
                message: 'Please provide all required fields'
            })
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                status: 'error',
                message: 'User already exists'
            })
        }

        const newUser = await User.create({
            fullName,
            email,
            password,
            passwordConfirm
        })
        if(!newUser){
            return res.status(400).json({
                status: 'error',
                message: 'Failed to create user'
            })
        }

        createSendToken(newUser, 201, res);
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'An error occurred while registering the user',
            error: error.message
        });
    }
}

// Authenticates a user and logs them in
export const loginUser = async(req,res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                status: 'error',
                message: 'Please provide email and password'
            })
        }

        const user = await User.findOne({email}).select('+password');

        if(!user || !(await user.correctPassword(password, user.password))){
            return res.status(401).json({
                status: 'error',
                message: 'Incorrect email or password'
            })
        }

        createSendToken(user, 200, res);
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'An error occurred while logging in',
            error: error.message
        });
    }
}

// Middleware to protect routes by verifying JWT token
export const protect = async(req,res,next) => {
    try {
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        }

        if(!token){
            return res.status(401).json({
                status: 'error',
                message: 'You are not logged in! Please log in to get access.'
            })
        }

        // Verify the JWT token and extract the user ID
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

        const currentUser = await User.findById(decoded.id);

        if(!currentUser){
            return res.status(401).json({
                status: 'error',
                message: 'The user belonging to this token does no longer exist.'
            })
        }

        req.user = currentUser;
        next();
    } catch (error) {
        res.status(401).json({
            status: 'error',
            message: 'Authentication failed',
            error: error.message
        });
    }
}


