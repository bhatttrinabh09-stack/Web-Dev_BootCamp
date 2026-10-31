// ==============================================================================
// Topic 07 Starter: Centralized Error Handler (4 Arguments Required!)
// ==============================================================================

export function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const isProd = process.env.NODE_ENV === 'production';

  // TODO:
  // 1. Log error message internally
  // 2. Set res.status(statusCode)
  // 3. Send JSON:
  //    { status: 'error', message: err.isOperational ? err.message : 'Internal server error' }
  //    (Do not leak stack traces!)
  res.status(statusCode).json({
    status: 'error',
    message: err.message || 'Internal server error',
  });
}
