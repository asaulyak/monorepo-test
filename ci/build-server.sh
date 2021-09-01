#!/bin/bash

set -e # this will cause the shell to exit immediately if any command exits with a nonzero exit value.

#Clean packages folder
find ./packages -name 'src' -exec rm -rf {} +

#Remove prepare script
sed -i -E "/\"prepare\":.+/d" package.json
echo "Files updated: package.json"

#Clean release folder
rm -rf ./release

#List of server apps
declare -a apps_array=("dev-ui")

#Build apps selected for release
echo "Starting server applications build"

for app in "${apps_array[@]}";do
  bash ./ci/build-server-app.sh $app
done

for app in "${apps_array[@]}";do
  cd ./release/$app && zip -r $app.zip ./ && mv $app.zip ../ && cd - && rm -rf ./release/$app
done

echo "Finished server applications build"
