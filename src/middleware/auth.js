const jwt = require("jsonwebtoken")
const userModel = require("../models/user")

const authentication = async (req, res, next) => {
    
    try {

        const token = req.cookies['access-Token']

        if (!token) {
            req.flash("error", "Please Login")
            return res.redirect("/auth/login")
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY)

        if (!payload) {
            req.flash("error", "Please Login")
            return res.redirect("/auth/login")
        }

        const user = await userModel.findOne({ _id: payload.userId })

        if (!user) {
            req.flash("error", "Please Login")
            return res.redirect("/auth/login")
        }

        req.user = user

        next()

    } catch (error) {
        next(error)
    }
}



module.exports = authentication




