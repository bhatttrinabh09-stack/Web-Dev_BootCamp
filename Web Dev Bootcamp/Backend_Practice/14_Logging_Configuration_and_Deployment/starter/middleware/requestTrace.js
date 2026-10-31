import crypto from 'node:crypto';

export function requestTrace(req, res, next) {
  // TODO: Read req.headers['x-request-id'] or generate crypto.randomUUID()
  const reqId = req.headers['x-request-id'] || crypto.randomUUID();
  req.id = reqId;
  res.setHeader('X-Request-Id', reqId);
  next();
}
