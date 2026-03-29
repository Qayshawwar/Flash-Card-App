const AppConfig = {
    app: {
        name: process.env.APP_NAME,
        server: process.env.SERVER,
        isDevelopment: ['development', 'dev', 'local'].includes(
            <string>process.env.SERVER
        ),
        port: parseInt(<string>process.env.BACKEND_PORT),
        apiVersion: process.env.API_VERSION,
        secret: process.env.SECRET
    },
    cors: {
        origin: process.env.CORS_ORIGIN ||  '*'
    },
    rateLimit: {
        windowMs: parseInt(<string>process.env.RATE_LIMIT_WINDOW_MS),
        max: parseInt(<string>process.env.RATE_LIMIT_MAX)
    },
    // Database configuration, plain configuration data
    db: {
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        port: parseInt(<string>process.env.DB_PORT),
        dialect: process.env.DB_DIALECT,
        timezone: process.env.DB_TIMEZONE,
        isLogging: process.env.DB_LOG,
        pool: {
            min: parseInt(<string>process.env.DB_POOL_MIN),
            max: parseInt(<string>process.env.DB_POOL_MAX),
            acquire: 30000,
            idle: 10000
        }
    }
};

export default Object.freeze(AppConfig);
