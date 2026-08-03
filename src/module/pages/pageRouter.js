const express = require("express")
const auth = require("./../../middleware/auth")
const pageController = require("./pageController")


const router = express.Router()

router.route("/:userId")
    .get(auth, pageController.getPage)


router.route("/:userId/follow")
    .post(auth, pageController.follow)

router.route("/:userId/unFollow")
    .post(auth, pageController.unFollow)



module.exports = router