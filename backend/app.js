const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
const port = 3000

// Parse body to JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setup Routes
const postsRoute = require('./routes/posts')
const authRoute = require('./routes/auth')
const newsletterRoute = require('./routes/newsletter')
const usersRoute = require('./routes/users')

// Middleware functions for routes
app.use('/api/posts', postsRoute)
app.use('/api/admin', authRoute)
app.use('/api/newsletter', newsletterRoute)
app.use('/api/users', usersRoute)

// Connect to MongoDB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log('Connected to MonogoDB')
})

// Listen server on port
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})