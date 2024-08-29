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

ENV REACT_APP_ENV=production
# Build the React app
RUN npm run build
# Use an official caddy runtime as a parent image
FROM --platform=linux/amd64 caddy
# Copy the ngnix.conf to the container
COPY Caddyfile /etc/caddy/Caddyfile
# Copy the React app build files to the container
COPY --from=build /app/build /usr/share/caddy
# Expose port 80 for Nginx
EXPOSE 80
# Start Nginx when the container starts
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]