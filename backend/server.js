import 'dotenv/config'
import express from "express"
import mainRoute from "./routes/mainRoute.js"

const app = express()


// routes

app.use("/who", mainRoute)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log("running...")
})