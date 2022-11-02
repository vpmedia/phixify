#!/usr/bin/env bash

set -e
docker build -t phixify:latest .
docker run --mount type=bind,source="$(pwd)"/phixify_examples,target=/assets phixify:latest ./phixify.sh all
