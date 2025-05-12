export const config = {
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'Jme24in!',
    database: process.env.DB_NAME || 'postgres',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: '24h',
  },
  port: parseInt(process.env.PORT || '3000'),
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
};
