const { error } = require("console");
const express = require("express");
const path = require("path")
const { setHeader } = require("./middleware/headers")


const app = express()


// Cors Policy
app.use(setHeader)

// Middleware Json Parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// Static Folders
app.use(express.static(path.join(__dirname, "..", "public")))
app.use("/css", express.static(path.join(__dirname, "public/css")))
app.use("/js", express.static(path.join(__dirname, "public/js")))
app.use("/fonts", express.static(path.join(__dirname, "public/fonts")))
app.use("/images", express.static(path.join(__dirname, "public/images")))


// Template Engine
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))


// Midleware NotFound Route
app.use((req, res) => {

    return res.status(404).json({
        message: "404 NotFound Route , check path/method ! "
    })

})


module.exports = app