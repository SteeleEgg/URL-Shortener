FROM node:14

# Set the working directory to the root of the monorepo
WORKDIR /app

# Copy the monorepo files into the working directory
COPY . .

# Install dependencies for all packages in the monorepo
RUN yarn install

# Star the app
CMD yarn dev

# Expose the ports for the api and web packages, as well as the default Redis port
EXPOSE 3333