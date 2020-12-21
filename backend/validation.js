const Joi = require('joi')

// Validate register request
const registerValidation = data => {

    // Create validation schema
    const schema = Joi.object({
        name: Joi.string(),
        username: Joi.string().min(4).required(),
        password: Joi.string().min(8).required(),
        email: Joi.string().email()
    })

    // Validate data based on schema
    return schema.validate(data)
}

// Validate login request
const loginValidation = data => {

    // Create validation schema
    const schema = Joi.object({
        username: Joi.string().min(4).required(),
        password: Joi.string().min(8).required()
    })

    // Validate data based on schema
    return schema.validate(data)
}

// Validate newsletter request
const newsletterValidation = data => {

    // Create validation schema
    const schema = Joi.object({
        email: Joi.string().email().required()
    })

    // Validate data based on schema
    return schema.validate(data)
}

// Validate user request
const userValidation = data => {

    // Create validation schema
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().email().required()
    })

    // Validate data based on schema
    return schema.validate(data)
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.newsletterValidation = newsletterValidation;
module.exports.userValidation = userValidation;
