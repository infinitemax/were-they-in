import 'dotenv/config'
import express from "express"
import mainRoute from "./routes/mainRoute.js"
import cors from "cors"

const app = express()
app.use(cors())


// routes

app.use("/who", mainRoute)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log("running...")
})