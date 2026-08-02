const express = require("express")
const auth = require("./../../middleware/auth")
const pageController = require("./pageController")


const router = express.Router()

router.route("/:userName")
    .get(auth, pageController.getPage)


module.exports = router