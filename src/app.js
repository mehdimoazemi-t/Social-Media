const { error } = require("console")
const express = require("express")
const path = require("path")
const session = require("express-session")
const flash = require("express-flash")
const { setHeader } = require("./middleware/headers")
const cookieParser = require("cookie-parser")


const authRouter = require("./module/auth/authRouter")
const postRouter = require("./module/post/postRouter")

const app = express()


// Cors Policy
app.use(setHeader)

// Json Parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// Cookie-Parser
app.use(cookieParser())


// Static Folders
app.use(express.static(path.join(__dirname, "..", "public")))
app.use("/css", express.static(path.join(__dirname, "public/css")))
app.use("/js", express.static(path.join(__dirname, "public/js")))
app.use("/fonts", express.static(path.join(__dirname, "public/fonts")))
app.use("/images", express.static(path.join(__dirname, "public/images")))


// Template Engine
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))



// Express Session
app.use(session({
    secret: 'Secret key',
    resave: false,
    saveUninitialized: true,
}))

// Express_Flash
app.use(flash())



// Route
app.get("/", (req, res) => {
    res.render("index.ejs")
})

app.use("/auth", authRouter)
app.use("/post", postRouter)





// Midleware NotFound Route
app.use((req, res) => {

    return res.status(404).json({
        message: "404 NotFound Route , check path/method ! "
    })

})


module.exports = app