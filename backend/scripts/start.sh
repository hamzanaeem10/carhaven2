#!/bin/sh

# Wait for MongoDB to be ready
echo "Waiting for MongoDB to be ready..."
while ! nc -z mongo 27017; do
  sleep 1
done
echo "MongoDB is ready!"

# Run database seeds
echo "Seeding database..."
node src/seed/seed.js

# Start the application
echo "Starting application..."
node src/server.js