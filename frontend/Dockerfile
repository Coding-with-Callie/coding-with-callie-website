# Use an official Node runtime as a parent image
FROM --platform=linux/amd64 node:18-alpine as build
# Set the working directory to /app
WORKDIR /app
# Copy the package.json and package-lock.json to the container
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy the rest of the application code to the container
COPY . .
# add env variables
ENV REACT_APP_API="/api"
# Build the React app
RUN npm run build
# Use an official Nginx runtime as a parent image
FROM --platform=linux/amd64 nginx:1.21.0-alpine
# Copy the ngnix.conf to the container
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy the React app build files to the container
COPY --from=build /app/build /usr/share/nginx/html/
# Expose port 80 for Nginx
EXPOSE 80
# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]