
const mongoose = require("mongoose")


const schema = mongoose.Schema({
    following: {
        type: String,
        required: true
    },
    followers: {
        type: String,
        required: true
    }
}, { timestamps: true })

const model = mongoose.model("Follow", schema)

module.exports = model