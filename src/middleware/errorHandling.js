const { errorRespone } = require("../utils/response");

const errorHandling = (schema) => {
    
    return async (req, res, next) => {

        try {

            const { error } = await schema.validate(req.body, { abortEarly: false });

            if (error) {

                const errObject = error.details.reduce((initialValue, currentValue) => {
                    initialValue[currentValue.path[0]] = currentValue.message
                    return initialValue
                }, {})

                return errorRespone(res, 400, {
                    error: errObject 
                })
            }

            next()

        } catch (error) {
            next(error)
        }
    }
}


module.exports = errorHandling