const Joi = require('joi');

const editProfileValidateSchema = Joi.object({
    username: Joi.string().min(4).max(16).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
        .min(8)
        .max(24)
        .pattern(new RegExp('(?=.*[a-z])(?=.*[A-Z])'))
        .optional()
        .trim().allow()
        .messages({
            'string.pattern.base': 'Password must contain at least one uppercase and one lowercase letter.',
            'string.min': 'Password must be at least {#limit} characters long.',
            'string.max': 'Password must not exceed {#limit} characters.',
            'any.required': 'Password is a required field.'
        }),
    name: Joi.string().min(8).max(26).trim().allow('').optional(),
})


module.exports = editProfileValidateSchema