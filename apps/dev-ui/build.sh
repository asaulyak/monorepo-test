#!/bin/bash

set -e # this will cause the shell to exit immediately if any command exits with a nonzero exit value.

PACKAGES_PATH=$1

#list of packages the app depends on
declare -a dir_array=("uuid")

mkdir -p $PACKAGES_PATH
for package in "${dir_array[@]}";do
  cp -r ./packages/$package $PACKAGES_PATH
done
