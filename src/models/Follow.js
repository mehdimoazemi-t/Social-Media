
const mongoose = require("mongoose")


const schema = mongoose.Schema({
    following: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    followers: {
        type: mongoose.Types.ObjectId,
        required: true
    }
}, { timestamps: true })

const model = mongoose.model("Follow", schema)

module.exports = model  