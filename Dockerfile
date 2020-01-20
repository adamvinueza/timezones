# The Docker image to build
FROM node:latest

# The working directory of the image (where . points)
WORKDIR /usr/src/app

# The package.json file manages the app dependencies
COPY package.json ./
RUN npm install

# Copy the source code
COPY . .

# The app runs off port 3000, so open it
EXPOSE 3000
