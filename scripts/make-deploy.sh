#!/bin/bash
repo_root=`git rev-parse --show-toplevel`
cd $repo_root

source .env

backup_date=$(date +%Y%m%d)
backup_dir=`mkdir -p backups/$backup_date`

backup_name="$repo_root/backups/$backup_date/backup-$backup_date.tar.gz"
backup_progress=`tar --exclude='./backups' -czf $backup_name *`
database_progress=`mysqldump -u $DB_USER -p$DB_PASS $DB_NAME > $repo_root/backups/$backup_date/database.sql`

echo "Checking for updates on main branch..."
git pull

echo "Updating dependencies..."
npm ci

echo "Creating build files..."
npm run build

npx sequelize-cli db:migrate

echo "Restarting PM2 processes..."
pm2 delete all
pm2 start infrastructure.config.js
