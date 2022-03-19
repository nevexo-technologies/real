#!/bin/bash

echo "Going to root directory of repository..."
cd ~/real

echo "Checking for updates on main branch..."
git pull

echo "Updating dependencies..."
npm ci

echo "Creating build files..."
npm run build

echo "Restarting PM2 processes..."
pm2 delete all
pm2 start infrastructure.config.js
