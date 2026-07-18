
const mogoose = require("mongoose");
const bcrypt = require("bcrypt");

const schema = mogoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
    },
    profilePicture: {
        type: String,
        required: false
    },
    bio: {
        type: String,
    },
    privet: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER",
        required: false
    },


}, { timestamps: true });

const model = mongoose.model("User", schema);

mongoose.pre("save", async (next) => {

    try {
        this.password = await bcrypt.hash(this.password, 10)
        next()
    } catch (error) {
        next(error)
    }

})

module.exports = { model, schema }