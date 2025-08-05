const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const router = express.Router();

router.post('/signup',async(req,res) => {
    const {name, email,password} = req.body;

    try{
        const exists = await User.findOne({email});
        if(exists) return res.status(400).json({msg: 'User already exists'});

        const hashedPassword = await bcrypt.hash(password, 10);
        const referralCode = `${name.toLowerCase().replace(/\s/g,'')}${new Date().getFullYear()}`;

        const newUser = new User({name,email,password: hashedPassword,referralCode,totalDonations: 0});
        await newUser.save();

        res.status(201).json({msg: 'User created successfully'});
    }catch(err){
        res.status(500).json({msg: 'Server error'});
    }
});

router.post('/login',async(req,res) => {
    const {email,password} = req.body;

    try{
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({msg: 'User not found'});

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(401).json({msg: 'Invalid credentials'});

        res.status(200).json({msg: 'Login successful', user: {name: user.name,
            email: user.email}});
    }catch (err){
        res.status(500).json({ msg: 'Server error', err });
    }
});

module.exports = router;