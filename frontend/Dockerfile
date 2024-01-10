FROM --platform=linux/amd64 node:18-alpine
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
ENV REACT_APP_API "/api"
CMD ["npm", "start"]