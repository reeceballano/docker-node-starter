const express = require('express');
const route = express.Router();
const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');
const User = require('../models/user');

// GET ALL USERS
route.get('/users', async (req, res) => {

    const users = await User.find().select('-password -role -online').exec();

    try {
        res.status(200).json({
            info: users
        })
    } catch( error ) {
        res.status(400).json({
            error: response.data
        })
    }

});

// FIND USER
route.get('/users/:id', async (req, res) => {
    
    try {
        const id = req.params.id;
        
        const user = await User.findById(id).exec();

        res.status(200).json({
            info: user,
        });
    } catch(error) {
        res.status(401).json({
            error: error
        });
    }

});

// ADD USER
route.post('/users', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    if(name.length < 3 || password.length < 5 || name.length == 0 || name.length == undefined) {
      
        return res.status(404).json({
           error: 'Please provide all required fields'
        });
        
    }

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: name,
        email: email,
        password: hashPassword,
        score: 0,
        online: 0,
    });

    user.save( (err)=> {
        if(err) {
            return res.status(400).json({
                error: err.errmsg
            });
        }

        res.status(200).json({
            info: 'New user added successfully'
        });
    });

});

module.exports = route;