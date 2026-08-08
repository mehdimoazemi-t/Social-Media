const { required } = require("joi")
const mongoose = require("mongoose")


const schema = mongoose.Schema({
    post: {
        type: mongoose.Types.ObjectId,
        ref: "Post",
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    }
})


const model = mongoose.model("Like", schema)

module.exports = model