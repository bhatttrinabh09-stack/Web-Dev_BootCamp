# Production Deployment Runbook

## 1. Hosting Architecture
- **API Server:** Render / Railway / Fly.io (Node.js runtime)
- **Database:** Managed PostgreSQL (Render / Supabase / Neon)

## 2. Environment Variables Configuration
Ensure these are set in the cloud provider's dashboard:
- `NODE_ENV`: `production`
- `PORT`: (Injected by host, e.g. `10000`)
- `DATABASE_URL`: `postgresql://user:password@host:port/database?sslmode=require`

## 3. Database Migration Steps
Before deploying new API code:
1. ...
2. ...

## 4. Smoke Testing Post-Deployment
- [ ] Ping `https://your-api.com/health` to confirm 200 OK.
- [ ] Check server logs for any uncaught startup errors.
- [ ] Perform a test user login and API mutation.
