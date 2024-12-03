import express, {Express, Request, Response} from "express"
import env from "dotenv"
import {connect} from "./config/database"
import { ApolloServer, gql } from "apollo-server-express"
import {typeDefs} from "./typeDefs"
import {resolvers} from "./resolvers"
env.config()
const app: Express = express()
const port: (Number | String) = process.env.PORT
connect()
const startServer = async() => {
    //GraphQl
    const apolloServer = new ApolloServer({
        typeDefs: typeDefs,
        resolvers: resolvers
    })
    await apolloServer.start()
    apolloServer.applyMiddleware({
        app: app,
        path: "/graphql",
    })
    app.listen(port, () => {
        console.log(`App listening on port ${port}`)
    })
}
startServer()