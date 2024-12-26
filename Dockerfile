FROM node:18-alpine

WORKDIR /app

# Install Python and other build dependencies
RUN apk add --no-cache python3 make g++ gcc

# Copy package files
COPY package*.json ./

# Clear npm cache and install with legacy-peer-deps
RUN npm cache clean --force && \
    npm install --legacy-peer-deps

# Verify installation
RUN ls -la && \
    echo "node_modules contents:" && \
    ls -la node_modules

COPY . .
COPY .env.local .env.local

RUN npm run build

EXPOSE 3000

ENV NODE_ENV production

CMD ["npm", "start"]