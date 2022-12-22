# Installing Docker 

## For Windows Users
First, [download Docker](https://docs.docker.com/compose/install/).

Second, you'll need to download and install [Docker Compose](https://github.com/docker/compose/releases).

Optionally, you can install [Docker Desktop](https://www.docker.com/products/docker-desktop/). It'll give you a GUI manager to manage your docker containers.

## For Linux & Mac Users
You can run `sudo apt install docker-compose` which will install Docker and Docker Compose for you.

# Building The Image
You'll need to build your docker container. Run `docker-compose build` to build the images.

# Starting the Image
Run `docker-compose up` to start it. 

You can optionally pass the `-d` flag to make it a silent startup.

# Using Yarn To Start
There are commands included in the root level `package.json`.

- `yarn docker:build` | Builds Images
- `yarn docker:dev` | Starts images with verbose output.
- `yarn docker:start` | Starts images without output.
- `yarn docker:stop` | Stops the images if you used `docker:start` to start them. 
