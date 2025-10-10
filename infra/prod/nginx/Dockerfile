FROM nginx:1.27-alpine

# Copy edge config
COPY infra/prod/nginx/edge.conf /etc/nginx/conf.d/edge.conf

# Remove default to avoid overlapping server blocks
RUN rm -f /etc/nginx/conf.d/default.conf

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --retries=5 \
  CMD wget -qO- http://127.0.0.1/ || exit 1
