# Edge proxy w/ ACME webroot
FROM nginx:1.27-alpine

# Install only what we need
RUN apk add --no-cache openssl ca-certificates tzdata curl

# Create ACME + cert paths (persisted via volumes at runtime)
RUN mkdir -p /var/www/certbot \
    && mkdir -p /etc/letsencrypt/live \
    && chown -R nginx:nginx /var/www/certbot /etc/letsencrypt

# (Optional) Pre-generate a small dhparam so TLS starts even before you replace it.
# Consider mounting a stronger dhparam (2048/4096) via volume later.
RUN openssl dhparam -out /etc/ssl/certs/dhparam.pem 1024

# Remove default site, add our config
RUN rm -f /etc/nginx/conf.d/default.conf
COPY infra/prod/nginx/edge.conf /etc/nginx/conf.d/edge.conf

# Basic healthcheck (hit HTTP port)
HEALTHCHECK --interval=10s --timeout=2s --retries=6 CMD \
  wget -qO- http://127.0.0.1/health || exit 1

EXPOSE 80 443
