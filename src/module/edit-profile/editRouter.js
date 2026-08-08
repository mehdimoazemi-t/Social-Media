const express = require("express")
const editController = require("./editController")
const router = express.Router()
const auth = require("../../middleware/auth")
const errorHandler = require("../../middleware/errorHandling")
const editProfileSchema = require("./editValidator")


router.route("/profile")
    .get(auth, editController.showViewEditProfile)
    .post(auth, errorHandler(editProfileSchema, "/edit/profile"), editController.update)


module.exports = router