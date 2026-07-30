const express = require("express")
const postController = require("./postController")
const { accountVerify } = require("../../middleware/accountVerify")
const router = express.Router()
const auth = require("../../middleware/auth")


router.route("/upload")
    .get(auth, accountVerify, postController.showViewUploader)


module.exports = router