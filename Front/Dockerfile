FROM node:18-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Install serve package
RUN npm install -g serve

# Copy source code
COPY . .

# Build with the environment variable
ARG VITE_API_URL=http://10.10.76.121:5454
ENV VITE_API_URL=${VITE_API_URL}

RUN npm run build

EXPOSE 5173

# Use serve to host the static files
CMD ["serve", "-s", "dist", "-l", "5173"]
