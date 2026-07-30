const successfullyRespone = (res, statusCode = 200, data) => {

    return res.status(statusCode).json({
        status: statusCode,
        success: true,
        message,
        data
    })
}

const errorRespone = (res, statusCode, data) => {

    return res.status(statusCode).json({
        status: statusCode,
        success: false,
        data
    })
}


module.exports = { successfullyRespone, errorRespone }