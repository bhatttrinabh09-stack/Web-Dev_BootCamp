import express from 'express';
import { productRouter } from './routes/products.js';

export const app = express();
app.use(express.json());

app.use('/api/products', productRouter);

// Centralized error handler
app.use((err, req, res, next) => {
  console.error("Database error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = 3000;
if (process.argv[1] && process.argv[1].endsWith('server.js')) {
  app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
}
