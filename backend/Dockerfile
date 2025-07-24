# Use official Node.js LTS image
FROM node:18

# Set working directory inside container
WORKDIR /usr/src/app

# Copy package files and install dependencies first (cache layer)
COPY package*.json ./

RUN npm install

# Copy all backend source code
COPY . .

# Build TypeScript (if you use TS)
RUN npx tsc

# Expose the port your backend runs on (adjust if needed)
EXPOSE 3001

# Start the backend
CMD ["node", "dist/index.js"]
