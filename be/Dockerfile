# Use official Node runtime
FROM node:20

# Create app directory inside container
WORKDIR /app

# Copy package files first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of source code
COPY . .

# Expose port
EXPOSE 3001

# Start server
CMD ["npm", "run", "dev"]
