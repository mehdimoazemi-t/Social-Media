const hasAccessProfile = require("../../utils/hasAccessProfile")
const followModel = require("../../models/Follow")
const userModel = require("../../models/user")
const { name } = require("ejs")


exports.getPage = async (req, res, next) => {
    try {

        const user = req.user
        const { userId } = req.params


        const isAccess = await hasAccessProfile(user._id, userId)

        if (isAccess == "page not found") {
            return res.render("error/404")
        }


        const isFollowd = await followModel.findOne({
            followers: user._id,
            following: userId
        })

        if (!isAccess) {
            req.flash("error", "this page is private")
            return res.render("pages/index", {
                private: Boolean(isAccess),
                follow: Boolean(isFollowd),
                userId,
                following: [],
                isOwnProfile: user._id == userId ? true : false
            })
        }



        return res.render("pages/index", {
            private: Boolean(isAccess),
            follow: Boolean(isFollowd),
            userId,
            isOwnProfile: user._id == userId ? true : false

        })

    } catch (error) {
        next(error)
    }
}


exports.follow = async (req, res, next) => {

    try {

        const { userId } = req.params
        const user = req.user

        const isFollowed = await followModel.findOne({
            followers: user._id,
            following: userId
        })


        if (isFollowed) {
            req.flash("error", "The user is already followed.")
            return res.redirect(`/page/${userId}`)
        }


        const followTarget = await followModel.create({
            following: userId,
            followers: user._id
        })

        res.redirect(`/page/${userId}`);

    } catch (error) {
        next(error)
    }

}


exports.unFollow = async (req, res, next) => {

    try {

        const { userId } = req.params
        const user = req.user


        const unFollowUser = await followModel.findOneAndDelete({
            followers: user._id,
            following: userId
        })

        if (!unFollowUser) {
            req.flash("error", "You are not following this user")
            return res.redirect(`/page/${userId}`)
        }


        req.flash("success", "Unfollowed successfully")
        res.redirect(`/page/${userId}`);

    } catch (error) {
        next(error)
    }

}