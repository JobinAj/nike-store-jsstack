# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json before copying the rest of the code
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Build the application
RUN npm run build

# Install `serve` to serve the built files
RUN npm install -g serve

# Expose the port Vite will run on
EXPOSE 5173

# Start the application using `serve`
CMD ["serve", "-s", "dist", "-l", "5173"]
