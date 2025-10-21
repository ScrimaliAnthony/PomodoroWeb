FROM node:22.20.0-trixie-slim@sha256:535ba2ed7dcf0dec29b0af4cac2b87ccdd935880212d4b9537e767b078ce1ca3

RUN apt-get update && apt-get install -y --no-install-recommends \
      tini ca-certificates \
  && rm -rf /var/lib/apt/lists/*

COPY cert/ /usr/local/share/ca-certificates/
RUN update-ca-certificates

ENV NODE_OPTIONS=--use-openssl-ca

WORKDIR /app
RUN chown -R node:node /app

USER node

COPY --chown=node:node package*.json ./
RUN npm ci --no-audit --no-fund

COPY --chown=node:node . .

EXPOSE 5173

ENTRYPOINT ["/usr/bin/tini", "--"]

CMD ["npm", "run", "dev", "--", "--host", "--port", "5173"]
