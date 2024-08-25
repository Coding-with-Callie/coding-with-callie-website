FROM --platform=linux/amd64 node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV DATABASE_HOST=""
ENV DATABASE_USERNAME=""
ENV DATABASE_PASSWORD=""
ENV DATABASE_NAME=""
ENV DATABASE_PORT=""
ENV ENVIRONMENT="production"
ENV JWT_SECRET=""
ENV GMAIL_PASSWORD=""
ENV ACCESS_KEY=""
ENV SECRET_ACCESS_KEY=""
RUN npm run build
CMD ["node", "dist/main.js"]