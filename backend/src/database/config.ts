import { Sequelize, Dialect } from 'sequelize';
import AppConfig from '../config/appConfig';

// Initialize Sequelize instance (connection with DB) with config from environment variables
export const db: Sequelize = new Sequelize({
    host: AppConfig.db.host,
    database: AppConfig.db.database,
    username: AppConfig.db.username,
    password: AppConfig.db.password,
    port: AppConfig.db.port,
    timezone: AppConfig.db.timezone,
    dialect: AppConfig.db.dialect as Dialect,
    pool: {
        min: AppConfig.db.pool.min,
        max: AppConfig.db.pool.max,
        acquire: AppConfig.db.pool.acquire,
        idle: AppConfig.db.pool.idle
    }
});
