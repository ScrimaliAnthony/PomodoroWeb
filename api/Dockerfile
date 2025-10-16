FROM node:22.20.0-trixie-slim@sha256:535ba2ed7dcf0dec29b0af4cac2b87ccdd935880212d4b9537e767b078ce1ca3

RUN apt-get update && apt-get install -y --no-install-recommends \
      tini ca-certificates \
  && rm -rf /var/lib/apt/lists/*

COPY cert/ /usr/local/share/ca-certificates/
RUN update-ca-certificates

ARG UID=1000
ARG GID=1000
RUN groupadd -g "${GID}" pomodoroapi && useradd -m -u "${UID}" -g "${GID}" pomodoroapi pomodoroapi

WORKDIR /app

USER pomodoroapi
COPY --chown=pomodoroapi:pomodoroapi package*.json ./

ENV NODE_ENV=development
ENV NODE_OPTIONS=--use-openssl-ca

RUN npm ci --no-audit --no-fund


EXPOSE 3000 9229

ENTRYPOINT ["/usr/bin/tini", "--"]

CMD ["sh", "-lc", "npx nodemon src/index.js"]
