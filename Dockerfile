#
# Copyright (c) Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
# author: Andras Csizmadia <andras@vpmedia.hu>
# see: https://docs.docker.com/engine/reference/builder
#
FROM ubuntu:22.04

ARG DEBIAN_FRONTEND=noninteractive

LABEL author="Andras Csizmadia"

RUN apt-get update && apt-get install -y \
apt-utils \
apt-transport-https \
software-properties-common \
curl \
wget \
imagemagick \
sox \
libsox-fmt-mp3 \
ffmpeg

RUN t=$(mktemp) && wget 'https://dist.1-2.dev/imei.sh' -qO "$t" && bash "$t" && rm "$t"

RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get update && apt-get install -y nodejs

RUN curl https://www.codeandweb.com/download/texturepacker/6.0.2/TexturePacker-6.0.2.deb --silent --output /tmp/TexturePacker-6.0.2.deb

RUN apt-get install -y  \
libegl1-mesa  \
libgl1-mesa-glx  \
libfontconfig  \
libx11-6  \
libxkbcommon-x11-0  \
/tmp/TexturePacker-6.0.2.deb

RUN echo agree | TexturePacker --version

ENV NODE_ENV development

WORKDIR /phixify

COPY package.json .
COPY package-lock.json .

RUN npm install

RUN mkdir -p asset
COPY . .
