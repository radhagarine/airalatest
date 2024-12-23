# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Install Python and other build dependencies
RUN apk add --no-cache python3 make g++ gcc

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Copy the .env.local file
COPY .env.local .env.local

# Build the Next.js application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Set the environment variable for production
ENV NODE_ENV production

# Run the application
CMD ["npm", "start"]

