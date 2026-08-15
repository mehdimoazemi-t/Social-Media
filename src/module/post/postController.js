const postModel = require("../../models/Post")
const likeModel = require("../../models/Like");
const hasAccess = require("../../utils/hasAccessProfile");


exports.showViewUploader = (req, res) => {
    return res.render("post/upload")
}


exports.createPost = async (req, res, next) => {

    try {
        const { description, tags } = req.body

        const hashtags = tags.split(",")
        const mediaUrlPath = `post/${req.file?.filename}`

        if (!req.file) {
            req.flash("error", "media is required")
            return res.render("post/upload")
        }

        let post = new postModel({
            description,
            tags: hashtags,
            user: req.user._id,
            media: {
                path: mediaUrlPath,
                filename: req.file.originalname
            }
        })

        post = await post.save()

        req.flash("success", "Post Uploaded Successfully")
        return res.redirect(`/page/${req.user._id}`)

    } catch (error) {
        next(error)
    }
}


exports.like = async (req, res, next) => {

    try {
        const userId = req.user._id
        const postId = req.body.postId



        const post = await postModel.findOne({ _id: postId })

        if (!post) {
            return res.json({
                message: "post not found"
            })
        }

        const isAccess = await hasAccess(userId, post.user)


        if (!isAccess) {
            return res.json({
                message: "You do not have access."
            })
        }

        const isLiked = await likeModel.findOne({
            post: postId,
            user: userId
        })


        if (isLiked) {
            await likeModel.deleteOne({
                _id: isLiked._id
            })
            return res.redirect(`/page/${post.user}`)
        }

        const like = await likeModel.create({
            post: postId,
            user: userId
        })

        return res.redirect(`/page/${post.user}`)

    } catch (error) {
        next(error)
    }
}

exports.dislike = async (req, res, next) => {
    try {

        const userId = req.user._id
        const { postId } = req.body

        const post = await postModel.findOne({ _id: postId })

        if (!post) {
            return res.json({
                message: "post not found"
            })
        }

        const hasLikePost = await likeModel.findOneAndDelete({ post: postId, user: userId })

        if (!hasLikePost) {
            return res.json({
                message: "User has not liked this post"
            })
        }

        return res.redirect(`/page/${post.user}`)

    } catch (error) {
        next(error)
    }
}