import dotenv from 'dotenv';
dotenv.config();


import { Server } from 'net';
import { createServer } from './server';
import AppConfig from './config/appConfig';


const BACKEND_PORT = AppConfig.app.port;

function startServer(): Server {
    const app = createServer();

    const server = app.listen(BACKEND_PORT, () => {
        console.log(`${AppConfig.app.name} running on port ${BACKEND_PORT} in ${AppConfig.app.isDevelopment ? 'development' : 'production'} mode`);
    });

    return server;
}

startServer();
