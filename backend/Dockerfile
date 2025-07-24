# Use official Node.js LTS image
FROM node:18

# Set working directory inside container
WORKDIR /usr/src/app

# Copy package files and install dependencies first
COPY package*.json ./
RUN npm install

# Copy all source code
COPY . .

# Build TypeScript
RUN npx tsc

# Expose the backend port (adjust if different)
EXPOSE 3001

# Start the server using the correct entry file
CMD ["node", "dist/server.js"]
