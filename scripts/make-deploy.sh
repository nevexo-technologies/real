#!/bin/bash

cd ~/real
git pull
npm install
npm run build
pm2 delete all
pm2 start infrastructure.config.js
