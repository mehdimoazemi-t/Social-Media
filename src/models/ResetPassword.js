const mongoose = require("mongoose")
const { type } = require("../module/auth/authValidator")

const schema = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        require: true
    },
    token: {
        type: String,
        require: true
    },
    expireTime: {
        type: Date,
        require: true
    }

})

const model = mongoose.model("ResetPassword", schema)

module.exports = model