# 1) Build
FROM node:20-alpine AS build
WORKDIR /app
ENV CI=true

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build   # Vite -> outputs to /app/dist

# 2) Serve with NGINX on 3000
FROM nginx:1.27-alpine

# If your config lives elsewhere, adjust this path accordingly
# (your earlier log showed deploy/nginx.conf; if you use that, keep it)
# COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf

# COPY THE RIGHT FOLDER:
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --retries=5 \
  CMD wget -qO- http://127.0.0.1:3000/ || exit 1
