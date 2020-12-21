const express = require('express')
const Newsletter = require('../models/Newsletter')
const { newsletterValidation } = require('../validation')
const verifyToken = require('./verifyToken')

const router = express.Router();

// Get email list - if logged in
router.get('/', verifyToken, async (req, res) => {
    try {
        const posts = await Newsletter.find()
        res.json(posts)
    } catch (err) {
        res.json({ message: err })
    } 
})

// Get single email by id - if logged in
router.get('/:emailId', verifyToken, async (req, res) => {
    try {
        const email = await Newsletter.findById(req.params.emailId)
        res.json(email)
    } catch (err) {
        res.json({ message: err })
    } 
})

// Post email
router.post('/', async (req, res) => {

    // Validate newsletter data
    const { error } = newsletterValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    // Check if email is already in database
    const emailExist = await Newsletter.findOne({ email: req.body.email })
    if(emailExist) return res.status(400).send('Email already exists')

    const email = new Newsletter({
        email: req.body.email
    })

    try {
        const postedEmail = await email.save()
        res.json(postedEmail)
    } catch (err) {
        res.json({ message: err })
    }    
})

// Update email - if logged in
router.patch('/:emailId', verifyToken, async (req, res) => {

    // Validate newsletter data
    const { error } = newsletterValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    // Check if email is already in database
    const emailExist = await Newsletter.findOne({ email: req.body.email })
    if(emailExist && emailExist._id != req.params.emailId) return res.status(400).send('Email already exists')

    try {
        const updatedEmail = await Newsletter.update(
            { _id: req.params.emailId }, 
            { $set: { email: req.body.email }}
        );
        res.json(updatedEmail)
    } catch (err) {
        res.json({ message: err })
    } 
})

// Delete email - if logged in
router.delete('/:emailId', verifyToken, async (req, res) => {
    try {
        const removedEmail = await Newsletter.remove({ _id: req.params.emailId });
        res.json(removedEmail)
    } catch (err) {
        res.json({ message: err })
    } 
})

module.exports = router;