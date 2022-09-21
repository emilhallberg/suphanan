#!/bin/bash

set -e

ys="\e[1;33m"
ye="\e[0m"

export PROD_IMAGE=${PROD_IMAGE:=app} \
       DOCKER_BUILDKIT=1

printf "$ys\n🦕 Building testing docker image\n\n$ye"
docker build . --target test-stage

printf "$ys\n🦕 Building production docker image\n\n$ye"
docker build . --target prod-stage -t $PROD_IMAGE
