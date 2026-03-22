# Build Stage for Frontend
FROM node:18-alpine AS frontend-build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production Stage for Backend
FROM node:18-alpine
WORKDIR /app

# Copy backend dependencies
COPY backend/package*.json ./backend/
RUN cd backend && npm install

# Copy backend source
COPY backend/ ./backend/

# Copy built frontend from frontend-build stage
COPY --from=frontend-build /app/build ./build

# Environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Expose port
EXPOSE 5000

# Start command
CMD ["node", "backend/server.js"]
