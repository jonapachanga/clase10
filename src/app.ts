import express from "express";

import { PORT, ORIGIN, MONGO_HOST } from "./config";
import { Routes } from "./interfaces/routes.interface";
import { StatusCodes } from "http-status-codes";

import cors from 'cors';
import mongoose from "mongoose";
import { ApiException } from "./exceptions/ApiException";
import { Mongoose } from "mongoose";

class App {
    private readonly port: string | number;

    private app: express.Application;
    private dbConnection: Mongoose | undefined;

    constructor(routes: Routes[]) {
        this.app = express();
        this.port = PORT || 8080;

        this.initDatabase();
        this.initializeMiddlewares();
        this.initRoutes(routes);
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            console.log(`Server running on http://localhost:${this.port}`);
        });
    }

    private initRoutes(routes: Routes[]) {
        routes.forEach(route => {
            this.app.use('/api', route.router);
        })

        this.app.get("*", function (req, res) {
            const description =  `path ${req.url} method ${req.method} not implemented.`
            res.status(StatusCodes.BAD_GATEWAY).json({ error: -2, description})
        });
    }

    private initializeMiddlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors({ origin: ORIGIN }));
    }

    private async initDatabase() {
        try {
            this.dbConnection = await mongoose.connect(`${MONGO_HOST}`,  { useNewUrlParser: true, useUnifiedTopology: true } );
            console.log('Mongo DB connected');
        } catch (e) {
            throw new ApiException(StatusCodes.INTERNAL_SERVER_ERROR, `${e}`);
        }
    }

    public get mongoDb() {
        return this.dbConnection;
    }
}

export default App;
