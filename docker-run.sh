#!/usr/bin/env bash

set -e
docker build -t phixify:latest .
mkdir -p ./assets
docker run --mount type=bind,source="$(pwd)"/assets,target=/assets phixify:latest ./phixify.sh help
