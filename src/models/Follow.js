const mongoose = require("mongoose")


const schema = mongoose.Schema({
    following: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    followers: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true })

const model = mongoose.model("Follow", schema)

module.exports = model