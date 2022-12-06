#!/bin/bash
repo_root=`git rev-parse --show-toplevel`
cd $repo_root

# Load env variables
source .env

# Create backup directory
backup_date=$(date +%Y%m%d)
backup_dir=`mkdir -p backups/$backup_date`
echo "Created directory $repo_root/backups/$backup_date"

# Backup files and database 
backup_name="$repo_root/backups/$backup_date/backup-$backup_date.tar.gz"
backup_progress=`tar --exclude="$repo_root/backups" -czf $backup_name $repo_root/*`
echo "Created platform backup at $backup_name"
database_progress=`mysqldump -u $DB_USER -p$DB_PASS $DB_NAME > $repo_root/backups/$backup_date/database.sql`
echo "Created database archive at $backup_name"