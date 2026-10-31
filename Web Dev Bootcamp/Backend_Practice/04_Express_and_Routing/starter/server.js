import express from 'express';
import { bookRouter } from './routes/books.js';

export const app = express();

// TODO: Enable express.json() middleware

// TODO: Mount bookRouter at '/api/books'

const PORT = 3000;
if (process.argv[1] && process.argv[1].endsWith('server.js')) {
  app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));
}
