const hasAccessProfile = require("../../utils/hasAccessProfile")
const followModel = require("../../models/Follow")
const userModel = require("../../models/user")
const { name } = require("ejs")
const { errorRespone } = require("../../utils/response")
const postModel = require("../../models/Post")
const mongoose = require("mongoose")


exports.getPage = async (req, res, next) => {
    try {

        const user = req.user
        const { userId } = req.params


        const isAccess = await hasAccessProfile(user._id, userId)

        if (isAccess == "ObjectId is not valid") {
            errorRespone(res, 400, {
                error: "ObjectId is not valid"
            })
        }

        if (isAccess == "page not found") {
            return res.render("error/404")
        }


        const isFollowd = await followModel.findOne({
            followers: user._id,
            following: userId
        })


        const userInfo = await userModel.findOne({ _id: userId })
        const userPosts = await postModel.find({ user: userId }).lean()
        console.log(userPosts);


        if (!isAccess) {
            req.flash("error", "this page is private")
            return res.render("pages/index", {
                private: Boolean(isAccess),
                follow: Boolean(isFollowd),
                userId,
                userInfo,
                isAccess,
                following: [],
                posts: [],
                followers: [],
                isOwnProfile: user._id == userId ? true : false
            })
        }


        let following = await followModel.find({ followers: userId })
            .populate("following", "username name")

        following = following.map(item => item.following)


        let followers = await followModel.find({ following: userId })
            .populate("followers", "username name")
            .lean()

        followers = followers.map(item => item.followers)



        return res.render("pages/index", {
            private: Boolean(isAccess),
            follow: Boolean(isFollowd),
            userId,
            userInfo,
            following,
            posts: userPosts,
            followers,
            isAccess,
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