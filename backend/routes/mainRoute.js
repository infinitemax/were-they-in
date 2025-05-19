
import express from "express"
const mainRouter = express.Router()

import { getActors, getMovieFromSearchTerm } from "../functions/getmovies.js"

const app = express()
const token = process.env.TMDB_READ_ACCESS


mainRouter.get("/", async (req, res) => {
    // res.send("this is the main route")
    console.log("main")

    const names = await getActors(token)

    res.send(names)

})



mainRouter.get("/hello", (req, res) => {
    res.send("<em>This is the hello test route!</em>")
    console.log("hello")

})

mainRouter.get("/search/:searchTerm", async (req, res) => {

    const searchTerm = req.params.searchTerm
    console.log(`searching for: ${searchTerm}`)


    const result = await getMovieFromSearchTerm(token, searchTerm)

    res.send(result)
})

export default mainRouter;