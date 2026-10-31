# 14. Logging, Configuration, and Deployment

## 1. Learning outcomes
By the end of this topic, you will be able to:
- Manage configuration across environments (Development, Testing, Staging, Production) using the Twelve-Factor App methodology.
- Implement structured JSON application logging (e.g. Pino / Winston) and trace requests using Correlation IDs (`X-Request-Id`).
- Guard against logging sensitive data (passwords, tokens, credit card numbers).
- Expose standardized Health Check endpoints (`/health`, `/health/ready`) for cloud orchestrators and uptime monitors.
- Execute database migrations safely as part of automated deployment pipelines.
- Deploy a Node.js API and PostgreSQL database to production cloud hosting platforms (e.g. Render, Railway, Fly.io).

## 2. What is this?
**Production Engineering** transforms local code into a resilient, observable cloud service running 24/7. **Structured Logging** outputs machine-readable JSON logs for log aggregators (Datadog, CloudWatch). **Health Checks** allow load balancers to detect crashes and route traffic away from unhealthy servers.

## 3. Why does it exist?
Using `console.log("here 1")` works in local development, but in a production cluster handling 50,000 requests an hour, unstructured console logs are useless for debugging. Structured logs with request IDs allow you to trace the exact error of a single failing user request across distributed microservices.

## 4. How does it work?
### The Health Check Lifecycle:
Load balancers ping your server every 10 seconds:

```
[ Cloud Load Balancer ] ── 1. GET /health ──> [ Express API ]
                                                     │
                                                     ├── 2. Pings PostgreSQL: SELECT 1;
                                                     │
                                  3. 200 OK <────────┘
[ Keep Routing Traffic ] <────────┘
```
If PostgreSQL crashes, `/health` returns HTTP 503 Service Unavailable, alerting the cloud orchestrator to restart the instance.

### Request Correlation Tracing:
Every request receives a unique UUID:
```
[Client] ──> GET /api/orders (X-Request-Id: 9b1deb4d) ──> [Server Logs: { "reqId": "9b1deb4d", "level": "info" }]
```

## 5. Important concepts and syntax
- Structured Log Output:
  ```json
  {"level":"info","time":1698712345,"reqId":"abc","msg":"Order created","orderId":42}
  ```
- Twelve-Factor Config: Store config in environment variables, never hardcoded.
- Health Check status codes:
  - `200 OK`: Healthy and ready for traffic.
  - `503 Service Unavailable`: Dependent service (DB) down.

## 6. Small worked example
A production health check endpoint verifying database connectivity:

```javascript
app.get('/health', async (req, res) => {
  try {
    // Ping DB
    await pool.query('SELECT 1;');
    res.status(200).json({
      status: 'healthy',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      services: { database: 'up' },
    });
  } catch (err) {
    res.status(503).json({
      status: 'unhealthy',
      error: 'Database connection failed',
      services: { database: 'down' },
    });
  }
});
```

## 7. Common mistakes
1. **Accidentally logging passwords or tokens:** Printing `console.log(req.body)` on registration/login endpoints writes user passwords into plaintext server log files!
2. **Hardcoding secrets in production dockerfiles or code:** Always inject secrets via host dashboard environment variables.
3. **Missing database connection retry logic on startup:** If Node boots 1 second before the PostgreSQL container is ready, Node will crash unless it handles initial connection retries.

## 8. Coding challenge
**Environment:** Terminal & Cloud Host.

Open `Backend_Practice/14_Logging_Configuration_and_Deployment/starter/`:
Configure a production-ready Express service in `server.js`:
1. In `config.js`:
   - Validate and export configuration reading from `process.env`: `PORT`, `NODE_ENV`, `DATABASE_URL`.
   - Throw an explicit Error if `DATABASE_URL` is missing when `NODE_ENV === 'production'`.
2. In `middleware/requestTrace.js`:
   - Inspects `req.headers['x-request-id']`. If missing, generates a new UUID.
   - Attaches `req.id` and sets response header `X-Request-Id`.
3. In `server.js`:
   - Implement `/health` endpoint returning system uptime and memory usage.
4. Complete `DEPLOYMENT_RUNBOOK.md` detailing step-by-step production deployment on Render/Railway.
5. Run `node test_deploy_ready.js` to verify environment checks and health routes.

## 9. Acceptance criteria
- [ ] Strict configuration validation (rejects invalid production configs).
- [ ] Request tracing middleware sets `X-Request-Id`.
- [ ] Health check endpoint responds with 200 and system metrics.
- [ ] Comprehensive `DEPLOYMENT_RUNBOOK.md` completed.

## 10. Test cases
- **Config Check:** Missing DATABASE_URL throws in production mode.
- **Request Tracing:** Responses include `X-Request-Id` header.
- **Health Check:** `GET /health` returns 200 with uptime.

## 11. Hints
1. *Concept:* Use `crypto.randomUUID()` built into modern Node.js to generate correlation IDs.
2. *Approach:* Set response header with `res.setHeader('X-Request-Id', req.id)`.
3. *Specifics:* In `config.js`, check `if (process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL) throw ...`.

## 12. Bonus challenge
Use `pino` and `pino-http` to replace all `console.log` calls with high-performance JSON streaming logs.

## 13. Self-check
1. What is structured logging and why is it preferred over `console.log` in production?
2. What is the purpose of an `X-Request-Id` correlation header?
3. What is the difference between a liveness probe and a readiness probe?
4. Why should user passwords and authorization tokens never appear in server log files?

## 14. References
- [The Twelve-Factor App: Config & Logs](https://12factor.net/)
- [Pino: Fast Node.js Logger](https://getpino.io/)
- [Render: Deploy a Node & PostgreSQL App](https://render.com/docs/deploy-node-express-app)
