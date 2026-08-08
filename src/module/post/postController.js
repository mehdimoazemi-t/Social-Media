const postModel = require("../../models/Post")

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