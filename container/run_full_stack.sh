#!/bin/bash
shutdown() {
    # Tear down the whole project when exiting the script
    docker-compose -p goat-app -f ./container/docker-compose.yml down
}
trap shutdown EXIT

# Run MongoDB in background
docker-compose -p goat-app -f ./container/docker-compose.yml up -d db

# Wait 10s to initialize data in DB
sleep 10

# Run app in interactive mode
docker-compose -p goat-app -f ./container/docker-compose.yml up app
