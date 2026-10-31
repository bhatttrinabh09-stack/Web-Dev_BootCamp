import express from 'express';
import { config } from './config.js';
import { requestTrace } from './middleware/requestTrace.js';

export const app = express();
app.use(express.json());
app.use(requestTrace);

// Health check endpoint
app.get('/health', (req, res) => {
  // TODO: Return 200 with { status: 'healthy', uptime: process.uptime(), timestamp: new Date().toISOString() }
  res.status(200).json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

if (process.argv[1] && process.argv[1].endsWith('server.js')) {
  app.listen(config.port, () => {
    console.log(`Server listening on port ${config.port} in ${config.nodeEnv} mode`);
  });
}
