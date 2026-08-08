const userModel = require("../../models/user")
const bcrypt = require("bcrypt")

exports.showViewEditProfile = async (req, res, next) => {
    try {

        const userInfo = await userModel.findOne({ _id: req.user._id })

        return res.render("profile-edit/edit", {
            userInfo
        })

    } catch (error) {
        next(error)
    }
}

exports.update = async (req, res, next) => {

    try {
        const { name, username, email, password } = req.body

        let updateData = { name, username, email }

        if (password) {
            updateData.password = await bcrypt.hash(password, 10)
        }


        const updateUserInfo = await userModel.findOneAndUpdate({ _id: req.user._id },
            updateData
        )

        req.flash("success", "profile updaate successfully")
        return res.redirect(`/page/${req.user._id}`)

    } catch (error) {
        next(error)
    }
}