import "reflect-metadata";
import express from "express";
import dotenv from 'dotenv';
import { AppDataSource } from "./src/config/db.ts";
import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./src/schema/typedef.ts";
import { resolvers } from "./src/controllers/resolvers.ts";
import { expressMiddleware } from "@as-integrations/express5";
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { authMiddleware } from "./src/middlewares/authMiddleware.ts";
dotenv.config();

const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {
        origin:"http://localhost:5173",
        credentials:true
    }
))
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

const startServer = async () => {
    try {
        await AppDataSource.initialize()
            .then(() => {
                console.log('Database is connected successfully');
            })
            .catch((error) => {
                console.log(error, 'Database connection is failed');
            })
            const server = new ApolloServer({
                typeDefs,
                resolvers
            })
            await server.start();
            app.use('/graphql', expressMiddleware(server, {
                context: async ({ req, res }) => {
                    const auth=await authMiddleware(req, res);
                    return {
                        req,
                        res,
                        user: auth?.decoded,
                    }
                }
            }));
            app.listen(PORT, () => {
                console.log(`Server is running at port ${PORT}`);
            });
    } catch (error) {
        console.log(error);
    }
}
startServer();






