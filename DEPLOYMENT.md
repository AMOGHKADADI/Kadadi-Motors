# 🚀 Production Deployment Guide — Kadadi Motors

This guide provides instructions for deploying the **Kadadi Motors** platform to production environments using **Google Cloud Run**, **Docker**, or standard Node.js container hosts.

---

## 🏗️ Production Architecture Overview

The application uses an **Express + Vite Node.js** full-stack structure:

- **Build Output**: `npm run build` compiles client React assets into `dist/` and bundles `server.ts` into a self-contained CommonJS file `dist/server.cjs` via `esbuild`.
- **Runtime Port**: Binds to **Port 3000** on host `0.0.0.0` as required by Cloud Run and container ingress routing.
- **Production Command**: `npm run start` (`node dist/server.cjs`).

---

## 🐳 Docker Deployment

### 1. Sample Dockerfile
```dockerfile
# Base Node image
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code and build
COPY . .
RUN npm run build

# Production runtime image
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# Copy compiled assets from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Install production dependencies only
RUN npm ci --only=production

EXPOSE 3000

CMD ["node", "dist/server.cjs"]
```

### 2. Build & Run Docker Image
```bash
# Build Docker image
docker build -t kadadi-motors:latest .

# Run container locally on port 3000
docker run -d -p 3000:3000 -e GEMINI_API_KEY="your_api_key_here" --name kadadi-app kadadi-motors:latest
```

---

## ☁️ Google Cloud Run Deployment

### Option A: Using gcloud CLI
```bash
# Submit build to Google Container Registry / Artifact Registry
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/kadadi-motors:latest

# Deploy to Cloud Run
gcloud run deploy kadadi-motors \
  --image gcr.io/YOUR_PROJECT_ID/kadadi-motors:latest \
  --platform managed \
  --region asia-south1 \
  --allow-unauthenticated \
  --port 3000 \
  --set-env-vars GEMINI_API_KEY="your_api_key_here"
```

---

## ⚙️ Environment Configuration

Ensure the following environment variables are configured in your Cloud container settings:

| Variable | Description | Required in Production |
| :--- | :--- | :--- |
| `PORT` | Container binding port (default `3000`) | Yes |
| `NODE_ENV` | Environment identifier (`production`) | Yes |
| `GEMINI_API_KEY` | Google Gemini AI API secret key | Optional (for AI features) |
| `APP_URL` | Public application endpoint URL | Recommended |

---

## 🔍 Health Monitoring & Sanity Verification

After deployment, test the health check endpoint:
```bash
curl https://your-domain.com/api/health
```

Expected JSON response:
```json
{
  "status": "ok",
  "service": "kadadi-motors",
  "timestamp": "2026-08-02T01:47:00.000Z"
}
```

---

## 🛡️ Production Security Checklist

- [x] Enforce HTTPS / TLS 1.3 termination at container ingress level.
- [x] Verify API keys (`GEMINI_API_KEY`) are stored in Secret Manager, never in source code.
- [x] Ensure Security Response Headers (`X-Content-Type-Options`, `X-Frame-Options`, `Strict-Transport-Security`) are enabled in `server.ts`.
- [x] Rate limit public API endpoints to prevent abuse.
