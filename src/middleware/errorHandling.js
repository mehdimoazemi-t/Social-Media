const { errorRespone } = require("../utils/response");

const errorHandling = (schema) => {

    return async (req, res, next) => {

        try {

            const { error } = await schema.validate(req.body, { abortEarly: false });

            if (error) {

                const errObject = error.details.reduce((initialValue, currentValue) => {

                    let errType = currentValue.type

                    switch (errType) {

                        case "string.email":
                            initialValue[currentValue.path[0]] = "Please enter a valid email address."

                            break;

                        case "any.required":
                            initialValue[currentValue.path[0]] = "The field is required and has not been filled in."

                            break;

                        case "any.required":
                            initialValue[currentValue.path[0]] = "The field is required and has not been filled in."

                            break;

                        case "string.min":
                            initialValue[currentValue.path[0]] = "The string length is less than the allowed limit."

                            break;

                        case "number.base":
                            initialValue[currentValue.path[0]] = "The input must be a number."

                            break;


                        case "number.base":
                            initialValue[currentValue.path[0]] = "The input must be a number."

                            break;


                        case "any.only":
                            initialValue[currentValue.path[0]] = "Please select a valid value"

                            break;


                        default:

                            initialValue[currentValue.path[0]] = currentValue.message

                    }

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