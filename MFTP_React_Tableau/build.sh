#!/bin/bash

set -e 

cd `dirname $0`

REF_NAME=$1
DEPLOY_PATH=/deploy/$REF_NAME
MODULE_NAME=imsui

REQUIRE_BACKUP=/home/gitlab-runner/imsui_build_require/

set +e 
cp -rf $REQUIRE_BACKUP/* ./
npm run dist:dev
if [ $? != 0  ]
then
	npm install
	mkdir -p $REQUIRE_BACKUP
	cp manifest.json $REQUIRE_BACKUP
	cp -rf build $REQUIRE_BACKUP
	cp -rf node_modules $REQUIRE_BACKUP
	set -e 
	npm run dist:dev
fi

mkdir imsui
cp -rf dist/* imsui
rm -rf imsui/node_modules

git log -n 1 | grep -v Author > $MODULE_NAME/commit.info
zip -r $MODULE_NAME.zip $MODULE_NAME

mkdir -p $DEPLOY_PATH
mv -f $MODULE_NAME.zip $DEPLOY_PATH/
