const express = require('express')
const User = require('../models/User')
const { userValidation } = require('../validation')
const verifyToken = require('./verifyToken')

const router = express.Router();

// Get all users - if logged in
router.get('/', verifyToken, async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.json({ message: err })
    } 
})

// Get single user by id - if logged in
router.get('/:userId', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
        res.json(user)
    } catch (err) {
        res.json({ message: err })
    } 
})

// Post user
router.post('/', async (req, res) => {

    // Validate user data
    const { error } = userValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    // Check if email is already in database
    const emailExist = await User.findOne({ email: req.body.email })
    if(emailExist) return res.status(400).send('Email already exists')

    const user = new User({
        name: req.body.name,
        email: req.body.email
    })

    try {
        const postedUser = await user.save()
        res.json(postedUser)
    } catch (err) {
        res.json({ message: err })
    }    
})

// Update user - if logged in
router.patch('/:userId', verifyToken, async (req, res) => {

    // Validate user data
    const { error } = userValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    // Check if email is already in database
    const emailExist = await User.findOne({ email: req.body.email })
    if(emailExist && emailExist._id != req.params.emailId) return res.status(400).send('Email already exists')

    try {
        const updatedUser = await User.update(
            { _id: req.params.userId }, 
            { $set: { 
                name: req.body.user,
                email: req.body.email
            }}
        );
        res.json(updatedUser)
    } catch (err) {
        res.json({ message: err })
    } 
})

// Delete user - if logged in
router.delete('/:userId', verifyToken, async (req, res) => {
    try {
        const removedUser = await User.remove({ _id: req.params.userId });
        res.json(removedUser)
    } catch (err) {
        res.json({ message: err })
    } 
})

module.exports = router;
