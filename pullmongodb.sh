#!/bin/sh

source ".env"

mkdir -p ~/tmp/mongodump
mongodump -h ${MONGO_REMOTE_HOST} -d ${MONGO_REMOTE_DB} -u ${MONGO_REMOTE_USER} -p ${MONGO_REMOTE_PASS} -o ~/tmp/mongodump

mongorestore -h ${MONGO_LOCAL_HOST} -d ${MONGO_LOCAL_DB} --drop ~/tmp/mongodump/${MONGO_REMOTE_DB}
rm -Rf ~/tmp/mongodump
