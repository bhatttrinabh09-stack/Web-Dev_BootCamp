export const config = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL || 'postgresql://localhost:5432/dev',
};

// TODO: Validate that if config.nodeEnv === 'production', databaseUrl must not be default
if (config.nodeEnv === 'production' && !process.env.DATABASE_URL) {
  throw new Error("FATAL: DATABASE_URL environment variable is required in production!");
}
