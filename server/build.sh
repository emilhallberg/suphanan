#!/bin/bash

TAG=suphanan-server

export COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1
docker build -t $TAG .
