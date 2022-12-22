FROM node:14

# Set the working directory to the root of the monorepo
WORKDIR /app

# Copy the monorepo files into the working directory
COPY package.json .

RUN npm install -g nodemon

RUN yarn install

COPY . .

# Star the app
CMD ["yarn", "start"]

# Expose the ports for the api and web packages, as well as the default Redis port
EXPOSE 3333