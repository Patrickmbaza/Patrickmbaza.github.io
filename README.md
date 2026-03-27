# Patrick Mbaza Portfolio

This repository now uses a React + Vite frontend plus a lightweight Node AI backend so the project can be deployed in split production targets:

- GitHub Pages for the public portfolio site
- DockerHub for separate frontend and backend production images
- GitHub Actions for CI, build validation, image publishing, and Pages deployment

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## AI assistant modes

The portfolio includes an AI assistant that supports two modes:

- `mock`: safe for local demos and GitHub Pages
- `live`: sends requests to a backend that holds your OpenAI API key

Create a local `.env` from [`.env.example`](/mnt/c/Users/patri/Desktop/PORTFOLIO/Patrickmbaza.github.io/.env.example):

```bash
cp .env.example .env
```

Mock mode example:

```bash
VITE_AI_MODE=mock
```

Live mode example:

```bash
VITE_AI_MODE=live
VITE_API_BASE_URL=https://your-backend.example.com
```

Expected live backend contract:

- `POST /api/chat`
- JSON body with `question`, `history`, and `context`
- JSON response with `answer`

Do not expose your real OpenAI API key in the React frontend. Keep it on the backend only.

## Live AI backend

The repo now includes a lightweight Node backend in [`server/index.js`](/mnt/c/Users/patri/Desktop/PORTFOLIO/Patrickmbaza.github.io/server/index.js) that exposes:

- `GET /health`
- `POST /api/chat`

Create a backend env file from [`.env.server.example`](/mnt/c/Users/patri/Desktop/PORTFOLIO/Patrickmbaza.github.io/.env.server.example):

```bash
cp .env.server.example .env.server
```

Then export the variables and run the backend:

```bash
set -a
. ./.env.server
set +a
npm run server
```

Run the frontend in live mode against that backend:

```bash
VITE_AI_MODE=live VITE_API_BASE_URL=http://localhost:8787 npm run dev
```

For GitHub Pages, use `mock` mode unless you also deploy the backend separately and point `VITE_API_BASE_URL` at that public service.

## Docker

Build the frontend image:

```bash
docker build -f Dockerfile.frontend -t patrickmbaza-portfolio-frontend .
docker run -p 8080:80 patrickmbaza-portfolio-frontend
```

Build the backend image:

```bash
docker build -f Dockerfile.backend -t patrickmbaza-portfolio-backend .
docker run --env-file .env.server -p 8787:8787 patrickmbaza-portfolio-backend
```

Run both together locally:

```bash
docker compose up --build
```

`docker compose` now builds the frontend with:

- `VITE_AI_MODE=live`
- `VITE_API_BASE_URL=http://backend:8787`

The DockerHub frontend image is built in safe mock mode by default for static hosting compatibility.

## GitHub Actions setup

Set these repository secrets before enabling the Docker publishing workflow:

- `DOCKERHUB_USERNAME`
- `DOCKERHUB_TOKEN`

The Docker workflow now publishes two images:

- `${DOCKERHUB_USERNAME}/patrickmbaza-portfolio-frontend`
- `${DOCKERHUB_USERNAME}/patrickmbaza-portfolio-backend`

For GitHub Pages, enable Pages in the repository settings and choose `GitHub Actions` as the source.

## Deploy GitHub Pages In Live Mode

GitHub Pages can only host the frontend. To use live AI in production, deploy the backend separately first, then build the Pages frontend against that backend URL.

### 1. Deploy the backend

Deploy the backend container from [`Dockerfile.backend`](/mnt/c/Users/patri/Desktop/PORTFOLIO/Patrickmbaza.github.io/Dockerfile.backend) to a service such as Render, Railway, Fly.io, or a VPS.

Set these backend environment variables:

```bash
HOST=0.0.0.0
PORT=8787
OPENAI_API_KEY=your_real_openai_api_key
OPENAI_MODEL=gpt-4.1-mini
ALLOWED_ORIGINS=https://patrickmbaza.github.io,https://www.patrickmbaza.github.io
```

Replace the origins with your real Pages URL or custom domain.

### 2. Configure GitHub Pages build variables

In your GitHub repository, go to `Settings` -> `Secrets and variables` -> `Actions` -> `Variables` and add:

- `PAGES_VITE_AI_MODE` = `live`
- `PAGES_VITE_API_BASE_URL` = `https://your-backend-domain.com`

The Pages workflow in [`.github/workflows/deploy-pages.yml`](/mnt/c/Users/patri/Desktop/PORTFOLIO/Patrickmbaza.github.io/.github/workflows/deploy-pages.yml) reads those values at build time.

### 3. Push to main

Once the backend is live and the GitHub variables are set, push to `main` or merge your PR into `main`. GitHub Actions will rebuild the frontend in live mode and deploy it to Pages.

### 4. Verify production

Check these URLs after deployment:

- `https://your-backend-domain.com/health`
- `https://patrickmbaza.github.io/`

If the assistant fails in production, the common causes are:

- wrong `PAGES_VITE_API_BASE_URL`
- backend missing `OPENAI_API_KEY`
- backend `ALLOWED_ORIGINS` not matching your Pages origin
- backend not serving HTTPS publicly
