import express from 'express';
import compression from 'compression';
import cors from 'cors';
import config from './config';
import { HostRoutes } from './host/hostRoutes';
import { PortRoutes } from './port/portRoutes';

export class Server {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.start();
    }

    public config(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(compression());
        this.app.use(cors());
    }

    public routes(): void {
        this.app.use("/api/host", new HostRoutes().router);
        this.app.use("/api/port", new PortRoutes().router);
    }

    public start(): void {
        this.app.listen(config.port, () => {
            console.log(`Tunnlr Backend läuft auf Port ${config.port}`);
        });
        this.app.get('*', (req, res) => {
            res.sendStatus(404);
        });
        this.app.post('*', (req, res) => {
            res.sendStatus(404);
        });
    }
}