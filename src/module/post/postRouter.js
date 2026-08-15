const express = require("express")
const postController = require("./postController")
const { accountVerify } = require("../../middleware/accountVerify")
const path = require("path")
const router = express.Router()
const multerUploader = require("../../middleware/multer")
const auth = require("../../middleware/auth")
const errorHandling = require("../../middleware/errorHandling")
const postValidateSchema = require("./postValidator")


const destinationPost = path.join(__dirname, "..", "..", "..", "public", "post");
const allowedTypes = /jpg|jpeg|png|WebP|mkv|mp4/

const uploader = multerUploader(destinationPost, allowedTypes)

router.route("/upload")
    .get(auth, accountVerify, postController.showViewUploader)
    .post(auth, errorHandling(postValidateSchema, "/post/upload"), uploader.single("media"), postController.createPost)


router.route("/like")
    .post(auth, postController.like)

router.route("/dislike")
    .post(auth, postController.dislike)


module.exports = router

