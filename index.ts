import express, {Express, Request, Response} from "express"
import env from "dotenv"
import {connect} from "./config/database"
import Article from "./model/article.model"
env.config()
const app: Express = express()
const port: Number | String = process.env.PORT
connect()
app.get("/", async(req: Request, res: Response) => {
    const articles = await Article.find()
    res.json(articles)
})
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

