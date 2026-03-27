# Patrick Mbaza Portfolio

This repository now uses a React + Vite frontend so the site can be built once and deployed to multiple targets:

- GitHub Pages for the public portfolio site
- DockerHub for a production container image
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

## Docker

```bash
docker build -t patrickmbaza-portfolio .
docker run -p 8080:80 patrickmbaza-portfolio
```

## GitHub Actions setup

Set these repository secrets before enabling the Docker publishing workflow:

- `DOCKERHUB_USERNAME`
- `DOCKERHUB_TOKEN`

For GitHub Pages, enable Pages in the repository settings and choose `GitHub Actions` as the source.
