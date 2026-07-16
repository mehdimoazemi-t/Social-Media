const app = require("./app");
const mongoose = require("mongoose")
const dotenv = require("dotenv")

const productionMode = process.env.NODE_MODE === "production"

if (!productionMode) {
    dotenv.config()
}


const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("db connected success (:");
    } catch (error) {
        console.error("db connection error", error);
        process.exit(1)
    }
}



const startServer = () => {
    const port = process.env.PORT || 3000

    app.listen(port, () => {
        console.log(`app runing on port ${port}`);
    })

}


const runApp = async () => {
    startServer()
    await dbConnection()
}


runApp()