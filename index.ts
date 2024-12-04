import express, {Express} from "express"
import env from "dotenv"
import {connect} from "./config/database"
import { ApolloServer, gql } from "apollo-server-express"
import {typeDefs} from "./typeDefs/index.typeDefs"
import {resolvers} from "./resolvers/index.resolvers"
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