

const { errorRespone } = require("../utils/response");

const errorHandling = (schema, route) => {
    return async (req, res, next) => {
        try {
            const { error } = await schema.validate(req.body, { abortEarly: false });

            if (error) {

                const errorMessages = error.details.map(detail => {
                    const field = detail.path[0];
                    let message = "";

                    switch (detail.type) {
                        case "string.email":
                            message = "Please enter a valid email address.";
                            break;
                        case "any.required":
                            message = `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
                            break;
                        case "string.min":
                            message = `${field.charAt(0).toUpperCase() + field.slice(1)} is too short.`;
                            break;
                        case "string.max":
                            message = `${field.charAt(0).toUpperCase() + field.slice(1)} is too long.`;
                            break;
                        case "string.empty":
                            message = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
                            break
                        case "number.base":
                            message = "Input must be a number.";
                            break;
                        case "any.only":
                            message = "Please select a valid option.";
                            break;

                        default:
                            message = detail.message;
                    }
                    return message;
                });

                const finalErrorMessage = errorMessages.join(" | ");

                req.flash("error", finalErrorMessage);

                return res.redirect(route);
            }

            next();
        } catch (error) {
            return errorRespone(res, 500, {
                error: {
                    message: error.message || "Internal Server Error",
                }
            });
        }
    };
};

module.exports = errorHandling;


