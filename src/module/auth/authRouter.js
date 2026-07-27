const express = require("express");
const authController = require("./authController");
const errorHandling = require("../../middleware/errorHandling");
const authValidateSchema = require("./authValidator");
const router = express.Router()


router.route("/register")
    .get(authController.showViewRegister)
    .post(errorHandling(authValidateSchema, "/auth/register"), authController.register)



router.route("/login")
    .get(authController.showViewLogin)
    .post(authController.login)

module.exports = router