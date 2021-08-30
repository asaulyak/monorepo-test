#!/bin/bash

set -e # this will cause the shell to exit immediately if any command exits with a nonzero exit value.

#Update all private repos links
from_pattern="git@github.com:OptimizeAd"
to_pattern="https:\/\/$AUTH_TOKEN@github.com\/OptimizeAd"
#Update all package.json files
sed -i "s/$from_pattern/$to_pattern/g" $(find . -type d \( -name node_modules -o -path name \) -prune -false -o -name "package.json")
echo "Files updated: package.json for each package"

from_pattern="git+ssh:\/\/git@github.com\/OptimizeAd"
to_pattern="https:\/\/$AUTH_TOKEN@github.com\/OptimizeAd"
#Update all package-lock.json files
sed -i "s/$from_pattern/$to_pattern/g" $(find . -type d \( -name node_modules -o -path name \) -prune -false -o -name "package-lock.json")

echo "Files updated: package-lock.json"

last_commit=`git log --format="%H" -n 1`

#Set last commit
from_pattern="lastCommitIdForReplace"
to_pattern=$last_commit
sed -i "s/$from_pattern/$to_pattern/g" $(find . -type d \( -name node_modules -o -path name \) -prune -false -o -name "package.json")
echo "Files updated: package.json"
cat package.json
