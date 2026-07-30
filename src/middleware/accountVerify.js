
exports.accountVerify = (req, res, next) => {

    const isVerify = req.user.isVerify

    if (!isVerify) {
        req.flash("verifyMsg", "You need to verify your account")
    }

    next()

}