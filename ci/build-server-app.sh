#!/bin/bash

set -e # this will cause the shell to exit immediately if any command exits with a nonzero exit value.

APP=$1

echo "Starting ${APP} build"

#Create app folder in release
mkdir -p ./release/$APP/apps/$APP

bash ./apps/$APP/build.sh ./release/$APP/packages

#Copy global package files
cp ./{package.json,package-lock.json} ./release/$APP

#Copy app files
cp -r ./apps/$APP/dist ./release/$APP/apps/$APP
cp ./apps/$APP/package.json ./release/$APP/apps/$APP
cp ./apps/$APP/package-lock.json ./release/$APP/apps/$APP 2>/dev/null || :

#Copy env files
cp ./apps/$APP/{.env.production.enc,.env.staging.enc} ./release/$APP

#Generate Procfile
echo "web: node apps/${APP}/dist/index.js" > ./release/${APP}/Procfile

ls -la ./release/$APP

echo "Finished ${APP} build"
