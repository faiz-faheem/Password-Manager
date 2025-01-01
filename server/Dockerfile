# Use the official Node.js image as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of your application code to the container
COPY . .

# Expose the port your server runs on (modify if your app runs on a different port)
EXPOSE 3001

# Command to run your application
CMD ["npm", "start"]