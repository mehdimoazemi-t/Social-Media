const userModel = require("../models/user")
const followModel = require("../models/Follow")

const hasAccessProfile = async (currentUserName, targetUserName) => {

    const page = await userModel.findOne({ username: targetUserName })

    if (!page) return "page not found"

    if (currentUserName == targetUserName) return true

    if (!page.private) return true

    const follow = await followModel.findOne({
        following: page.username,
        followers: currentUserName
    })

    if (page.private && !follow) return false

    return true

}


module.exports = hasAccessProfile