const errorHandling = require("../../middleware/errorHandling")
const userModel = require("../../models/user")
const { successfullyRespone, errorRespone } = require("../../utils/response")
const authValidateSchema = require("./authValidator");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const refreshTokenModel = require("../../models/RefreshToken")
const nodemailer = require("nodemailer")
const { v4: uuidv4 } = require("uuid")
const ResetPasswordModel = require("./../../models/ResetPassword")


exports.showViewRegister = (req, res) => {
    res.render("auth/register");
};

exports.register = async (req, res) => {
    try {

        const {
            username,
            email,
            password,
            name,
            profilePicture,
            bio,
        } = req.body



        const isExistUser = await userModel.findOne({
            $or: [
                { username: username },
                { email: email }
            ]
        });


        if (isExistUser) {
            req.flash("error", "Username or email is already taken")
            return res.redirect("/auth/register");
        }

        const isFirstUser = (await userModel.countDocuments()) == 0
        let role = null
        role = isFirstUser ? "ADMIN" : "USER"

        let user = new userModel({
            username,
            email,
            password,
            name: name ? name : "",
            profilePicture,
            bio: bio ? bio : "",
            private: false,
            isVerified: false,
            role,
        })

        user = await user.save()


        const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY)

        res.cookie("access-Token", accessToken, {
            maxAge: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            httpOnly: true
        })


        const refreshToken = await refreshTokenModel.createRefreshToken(user)
        res.cookie("refresh-token", refreshToken.refreshToken, {
            httpOnly: true,
            maxAge: refreshToken.refreshTokenDocument.expire
        })

        req.flash("success", "Signed Up Successfully ")
        return res.redirect("/")


    } catch (error) {
        req.flash("error", error.message || "Internal Server Error");
        return res.redirect("/auth/register");
    }

}



exports.showViewLogin = async (req, res) => {
    res.render("auth/login")
}

exports.login = async (req, res, next) => {

    try {
        const { email, password } = req.body

        const user = await userModel.findOne({ email })


        if (!user) {
            req.flash("error", "User Not Found")
            return res.redirect("/auth/login")
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password,);

        if (!isPasswordMatch) {
            req.flash("error", "Invalid Email or Password")
            return res.redirect("/auth/login")
        }


        const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY)

        res.cookie("access-Token", accessToken, {
            maxAge: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            httpOnly: true
        })


        const refreshToken = await refreshTokenModel.createRefreshToken(user)
        res.cookie("refresh-token", refreshToken.refreshToken, {
            httpOnly: true,
            maxAge: refreshToken.refreshTokenDocument.expire
        })

        req.flash("success", "Signed in Successfully ")
        return res.redirect("/")
    } catch (error) {
        next(error)
    }
}



exports.refreshToken = async (req, res, next) => {
    try {

        const { token } = req.body

        const userId = await refreshTokenModel.verifyRefreshToken(token)

        if (!userId) {
            return errorRespone(res, 401, { message: "Refresh token is invalid or expired. Please login again." })
        }


        const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET_KEY)

        res.cookie("access-token", accessToken, {
            httpOnly: true,
            maxAge: 2 * 1000 * 20
        })

        return successfullyRespone(res, 200, { message: "Token Refreshed Successfully" })


    } catch (error) {
        next(error)
    }
}



exports.showForgetPasswordView = async (req, res, next) => {
    try {
        return res.render("auth/forget-password")
    } catch (error) {
        next(error)
    }
}

exports.showResetPasswordView = async (req, res, next) => {
    try {
        return res.render("auth/reset-password")
    } catch (error) {
        next(error)
    }
}


exports.forgetPassword = async (req, res, next) => {
    try {

        const { email } = req.body

        //  Validate Email 

        const user = await userModel.findOne({ email })

        if (!user) {
            req.flash("error", "user not found")
            return res.redirect("back")
        }

        const expireTime = Date.now() + 1000 * 60 * 60
        const token = uuidv4()



        await ResetPasswordModel.create({
            user: user._id,
            token,
            expireTime
        })


        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_APP_PASSWORD
            }
        })

        const nodemailerOption = {
            from: `"Support Team" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Reset Password",
            html: `
    <h2>Hi ${user.name}</h2>
    <p>Please click the link below to reset your password:</p>
    <a href="http://localhost:3000/auth/forget-password/${token}">Reset Password</a>
    <p>This link will expire in 1 hour.</p>`
        }


        await transporter.sendMail(nodemailerOption)

        req.flash("success", "email send successfully")
        res.redirect("back")


    } catch (error) {
        next(error)
    }
}


// exports.resetPassword = async (req, res, next) => {
//     try {

//     } catch (error) {
//         error(next)
//     }
// }
