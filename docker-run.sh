#!/usr/bin/env bash

#
# Copyright (c) Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
# author: Andras Csizmadia <andras@vpmedia.hu>
#

set -e

docker build -t phixify:latest . && \
rm -rf ./asset && \
mkdir -p ./asset && \
rsync -a --include '*/' --include '*.png' --include '*.wav' --exclude '*' "$(pwd)"/../phixify-example/public/asset/single_project_single_bundle/ ./asset/ && \
docker run --mount type=bind,source="$(pwd)"/asset,target=/phixify/asset phixify:latest ./phixify.sh all --verbose
