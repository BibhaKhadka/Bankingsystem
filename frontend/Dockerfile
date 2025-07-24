# Build stage
FROM node:16-alpine as build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./

RUN npm install

# Copy rest of the app and build
COPY . .

RUN npm run build

# Production stage
FROM nginx:stable-alpine

# Copy built React app from build stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for HTTP
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
