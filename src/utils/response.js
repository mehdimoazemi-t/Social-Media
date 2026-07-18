const successfullyRespone = (res, statusCode = 200, message, data) => {

    return res.status(statusCode).json({
        status: statusCode,
        success: true,
        message,
        data
    })
}


const errorRespone = (res, statusCode, message, data) => {
    
    return res.status(statusCode).json({
        status: statusCode,
        success: false,
        error: message,
        data
    })
}


module.exports = { successfullyRespone, errorRespone }