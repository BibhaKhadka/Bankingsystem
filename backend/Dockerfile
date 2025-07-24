# Use official Node.js LTS image
FROM node:18

# Set working directory inside container
WORKDIR /usr/src/app

# Copy package files and install dependencies first (cache layer)
COPY package*.json ./

RUN npm install

# Copy all backend source code
COPY . .

# Build TypeScript
RUN npx tsc

# Expose backend port
EXPOSE 3001

# Start the backend server
CMD ["node", "dist/server.js"]
