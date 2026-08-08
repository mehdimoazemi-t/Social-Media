const userModel = require("../models/user")
const followModel = require("../models/Follow")
const mongoose = require("mongoose")

const hasAccessProfile = async (currentUserId, targetUserId) => {

    const isValidId = mongoose.isValidObjectId(targetUserId)

    if (!isValidId) return "ObjectId is not valid"

    const page = await userModel.findOne({ _id: targetUserId })

    if (!page) return "page not found"

    if (currentUserId == targetUserId) return true

    if (!page.private) return true

    const follow = await followModel.findOne({
        following: page._id,
        followers: currentUserId
    })

    if (page.private && !follow) return false

    return true

}


module.exports = hasAccessProfile