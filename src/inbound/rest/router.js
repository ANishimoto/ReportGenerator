//routes
import example from './routes/example.js';
import userRoutes from './routes/userRoutes.js';
import templateTypeRoutes from './routes/templateTypeRoutes.js';
import templateRoutes from './routes/templateRoutes.js';

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

class RouterController {
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    middleware() {
        this.express.use(express.json({ limit: '100mb', extended: true }));
        this.express.use(express.urlencoded({ limit: '100mb', extended: true }));
        this.express.use(cors());
    }

    routes() {
        this.express.use(`${process.env.BASE_URI}`, example);
        this.express.use(`${process.env.BASE_URI}`, userRoutes);
        this.express.use(`${process.env.BASE_URI}`, templateTypeRoutes);
        this.express.use(`${process.env.BASE_URI}`, templateRoutes);
    }
}

export default new RouterController().express;