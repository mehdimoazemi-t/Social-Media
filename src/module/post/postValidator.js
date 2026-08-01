const joi = require("joi")


const postValidator = joi.object({
    description: joi.string().max(100_000).trim().optional(),
})


module.exports = postValidator