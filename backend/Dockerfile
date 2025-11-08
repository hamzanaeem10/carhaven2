# Backend Dockerfile
FROM node:18

WORKDIR /usr/src/app

# Install build dependencies
RUN apt-get update && \
    apt-get install -y \
    netcat-openbsd \
    python3 \
    make \
    g++ \
    build-essential

# Copy package files
COPY package*.json ./

# Install dependencies and rebuild bcrypt
RUN npm install
RUN npm rebuild bcrypt --build-from-source

# Copy source
COPY . .

# Make startup script executable
COPY scripts/start.sh /usr/local/bin/start.sh
RUN chmod +x /usr/local/bin/start.sh

ENV NODE_ENV=production
EXPOSE 5000

# Use the startup script as entrypoint
CMD ["/usr/local/bin/start.sh"]
