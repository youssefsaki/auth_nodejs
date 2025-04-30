const User = require('../models/User');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const cookie_parser = require("cookie-parser");

const getUsers = async (req, res) => {
    const users = await User.find();
    
    try {
        if(!users) return res.status(400).json({message: 'Failed To Fetch Users'});

        res.status(200).json({message: 'users Fetch Successfully', users});
    } catch (error) {
        res.status(404).json({error});
    }
}

const createUser = async (req, res) => {
    try {
        const user = req.body;
        const newUser = await User.create(user);
        res.status(200).json({message: "User Registered Successfully"}, newUser);
    } catch (error) {
        console.log(error);
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email});
        // const {email: e, password: p} = await User.findOne({email});

        const hashedPassword = await bcrypt.compare(password, user.password);

        if(!user || !hashedPassword) {
            res.status(400).json({message: 'Invalid Credentials'});
        }

        //* generate Token 
        let token = jwt.sign
                (
                    {user: user._id}, 
                    process.env.SECRET_KEY_TOKEN, 
                    { expiresIn: '1h'}
                );
        
        res.setHeader('Set-Cookie', token);
        res.status(200).json(token);
        
        //* comparing Password 
        // const comparedPassword = await bcrypt.compare()
        
    } catch (error) {
        res.status(500).json({error});
    }
}

module.exports = {
    getUsers,
    createUser,
    loginUser
}