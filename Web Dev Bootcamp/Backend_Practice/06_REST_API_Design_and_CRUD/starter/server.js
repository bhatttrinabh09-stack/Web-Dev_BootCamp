import express from 'express';
import { issueRouter } from './routes/issues.js';

export const app = express();
app.use(express.json());

app.use('/api/issues', issueRouter);

const PORT = 3000;
if (process.argv[1] && process.argv[1].endsWith('server.js')) {
  app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
}
