const { required } = require("joi")
const mongoose = require("mongoose")

const schema = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    media: {
        path: { type: String },
        filename: { type: String }
    },
    description: {
        type: String,
        required: false,
    },
    tags: {
        type: [String],
        required: false
    }

}, { timestamps: true })

const model = mongoose.model("Post", schema)

module.exports = model