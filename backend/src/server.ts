import express, { Application } from 'express';
import compression from 'compression';
import cors from 'cors';
import AppConfig from './config/appConfig';
import routesV1 from './api/routes/v1';
import { db } from './database/config';

export function createServer(): Application {
    const app = express();

    // CORS
    app.use(cors({ origin: AppConfig.cors.origin, credentials: true }));

    // Body parsing
    app.use(express.urlencoded({ extended: false, limit: '5mb' }));
    app.use(express.json({ limit: '5mb' }));
    app.use(compression());


    // Health check
    app.get('/health', async (_req, res) => {
        try {
            await db.authenticate();
            res.status(200).json({ status: 'ok', uptime: process.uptime(), database: 'connected' });
        } catch {
            res.status(503).json({ status: 'error', uptime: process.uptime(), database: 'disconnected' });
        }
    });

    // API routes
    app.use(`/api/${AppConfig.app.apiVersion}`, routesV1);

    return app;
}
