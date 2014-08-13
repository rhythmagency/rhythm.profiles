#!/bin/sh

source ".env"

#( set -o posix ; set )

mkdir -p ~/tmp/mongodump
mongodump -h ${MONGO_LOCAL_HOST} -d ${MONGO_LOCAL_DB} -o ~/tmp/mongodump
mongorestore -h ${MONGO_REMOTE_HOST} -d ${MONGO_REMOTE_DB} -u ${MONGO_REMOTE_USER} -p ${MONGO_REMOTE_PASS} --drop ~/tmp/mongodump/${MONGO_LOCAL_DB}
rm -Rf ~/tmp/mongodump
