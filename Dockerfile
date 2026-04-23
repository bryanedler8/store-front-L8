# Use an official Node.js runtime as a parent image
FROM node:18.20.4-alpine AS builder

WORKDIR /app

# Accept build arguments for API URLs
ARG VUE_APP_PRODUCT_SERVICE_URL
ARG VUE_APP_ORDER_SERVICE_URL
ARG VUE_APP_MAKELINE_SERVICE_URL

# Set environment variables for the build
ENV VUE_APP_PRODUCT_SERVICE_URL=$VUE_APP_PRODUCT_SERVICE_URL
ENV VUE_APP_ORDER_SERVICE_URL=$VUE_APP_ORDER_SERVICE_URL
ENV VUE_APP_MAKELINE_SERVICE_URL=$VUE_APP_MAKELINE_SERVICE_URL

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app source code to the container
COPY . .

# Build the app
RUN npm run build 

# Run the app on nginx
FROM nginx:stable-alpine-slim AS runner

# Copy the build output to replace the default nginx contents
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose the port the app listens on
EXPOSE 80

# Set the build argument for the app version number
ARG APP_VERSION=0.1.0

# Set the environment variable for the app version number
ENV APP_VERSION=$APP_VERSION

# Copy the nginx configuration template to the container
COPY nginx.conf /etc/nginx/conf.d/nginx.conf.template

# Update the nginx configuration to use the app version number
RUN envsubst '${APP_VERSION}' < /etc/nginx/conf.d/nginx.conf.template > /etc/nginx/conf.d/default.conf

# Start the app
CMD ["nginx", "-g", "daemon off;"]
