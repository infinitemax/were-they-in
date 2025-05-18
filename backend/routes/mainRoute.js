// const express = require("express")
// const router = express.Router();

import express from "express"
const mainRouter = express.Router()

import { getMovies } from "../functions/getmovies.js"

const app = express()
const token = process.env.TMDB_READ_ACCESS


mainRouter.get("/", async (req, res) => {
    // res.send("this is the main route")
    console.log("main")

    const names = await getMovies(token)

    res.send(names)

})



mainRouter.get("/hello", (req, res) => {
    res.send("<em>This is the hello test route!</em>")
    console.log("hello")


})

export default mainRouter;