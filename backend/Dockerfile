# 1. Use an official Node.js base image
FROM node:18

# 2. Set working directory inside container
WORKDIR /usr/src/app

# 3. Copy package files first to install dependencies (optimizes caching)
COPY package*.json ./

# 4. Install dependencies (including devDependencies like TypeScript)
RUN npm install

# 5. Copy the rest of your backend source code into the container
COPY . .

# 6. Compile TypeScript to JavaScript
RUN npx tsc

# 7. Expose the port your backend runs on
EXPOSE 3001

# 8. Start the backend (entry point after TypeScript compilation)
CMD ["node", "dist/index.js"]
