import express from "express";
import { PORT } from "./config";
import { Routes } from "./interfaces/routes.interface";
import { StatusCodes } from "http-status-codes";

class App {
    private readonly port: string | number;

    private app: express.Application;

    constructor(routes: Routes[]) {
        this.app = express();
        this.port = PORT || 8080;

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
    }
}

export default App;
