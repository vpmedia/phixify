#!/usr/bin/env bash
#
# Copyright (c) Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
# author: Andras Csizmadia <andras@vpmedia.hu>
# version: 1.0.0
#

set -e

NODE_ENV=development ./src/index.js $1 $2 $3 $4 $5 $6 $7 $8 $9
