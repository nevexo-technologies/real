#!/bin/bash
repo_root=`git rev-parse --show-toplevel`
cd $repo_root

source .env

# Create backup directory
backup_date=$(date +%Y%m%d)
backup_dir=`mkdir -p backups/$backup_date`

# Backup files and database 
backup_name="$repo_root/backups/$backup_date/backup-$backup_date.tar.gz"
backup_progress=`tar --exclude='./backups' -czf $backup_name *`
database_progress=`mysqldump -u $DB_USER -p$DB_PASS $DB_NAME > $repo_root/backups/$backup_date/database.sql`

# Pull latest changes
git pull

# Install dependencies
yarn install

# Run migrations
yarn run db:migrate:deploy

# Build assets
yarn run buld

# Run process manager
pm2 reload ecosystem.config.js