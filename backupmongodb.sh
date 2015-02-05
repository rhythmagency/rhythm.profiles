#!/bin/sh

source ".env"

mkdir -p ./mongo_backup
mongodump -h ${MONGO_REMOTE_HOST} -d ${MONGO_REMOTE_DB} -u ${MONGO_REMOTE_USER} -p ${MONGO_REMOTE_PASS} -o ./mongo_backup