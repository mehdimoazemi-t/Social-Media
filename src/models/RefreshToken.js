const mongoose = require("mongoose")
const { v4: uuidv4 } = require("uuid");

const schema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    refreshToken: {
        type: String,
        required: true
    },
    expire: {
        type: Date,
        required: true
    }
})


schema.statics.createRefreshToken = async function (user) {

    const expire = new Date(Date.now() + Number(process.env.REFRESH_EXPIRE) * 24 * 60 * 60 * 1000)

    const refreshToken = uuidv4()

    let refreshTokenDocument = new model({
        user: user._id,
        refreshToken,
        expire
    })

    refreshTokenDocument = await refreshTokenDocument.save()

    return { refreshToken, refreshTokenDocument }
}

schema.statics.verifyRefreshToken = async function (token) {

    const refreshToken = await model.findOne({ refreshToken: token })

    if (refreshToken && refreshToken.expire > Date.now()) {
        return refreshToken.user
    } else {
        return null
    }

}


const model = mongoose.model("RefreshToken", schema)

module.exports = model