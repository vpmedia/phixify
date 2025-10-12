# Phixify

[![npm version](https://badge.fury.io/js/@vpmedia%2Fphixify.svg)](https://badge.fury.io/js/@vpmedia%2Fphixify)
[![Node.js CI](https://github.com/vpmedia/phixify/actions/workflows/ci.yml/badge.svg)](https://github.com/vpmedia/phixify/actions/workflows/ci.yml)

Phaser and Pixi.js game engine asset and manifest command line generator.

## Features

- Converts WAV audio files to MP3 and OGG formats
- Converts PNG image files to AVIF and WEBP formats
- Resizes images to multiple resolutions
- Generates audio sprite files
- Generates sprite sheet files
- Creates pixi.js asset bundle JSON manifest
- Creates phaser resource pack JSON manifest

## Pre-requisites

- node.js
- sox
- texture-packer
- imagemagick (optional)
- ffmpeg (optional)

## Installation guide

### Ubuntu Linux

    $ curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    $ sudo apt-get update
    $ sudo apt-get install -y nodejs sox libsox-fmt-mp3

#### Optional tools

    $ sudo apt-get install -y imagemagick ffmpeg

##### Update ImageMagick to v7

This is an optional step because Phixify uses the Sharp image library by default.

https://github.com/SoftCreatR/imei#one-step-automated-install

    $ t=$(mktemp) && wget 'https://dist.1-2.dev/imei.sh' -qO "$t" && bash "$t" && rm "$t"

### MacOS

    $ brew update
    $ brew install node sox

#### Optional tools

    $ brew install imagemagick ffmpeg

### Install TexturePacker for your platform

https://www.codeandweb.com/texturepacker/documentation/installation-and-licensing

## Getting started

### Show the CLI help

> When using the npm package locally:

    $ pnpm add-dev @vpmedia/phixify
    $ ./node_modules/.bin/phixify

> When using the npm package globally:

    $ pnpm install --global @vpmedia/phixify
    $ phixify

> When using the git repository:

    $ git clone git@github.com:vpmedia/phixify.git
    $ cd phixify
    $ pnpm install
    $ ./phixify.sh

## Examples

https://github.com/vpmedia/phixify-example

## Conventions

- Input audio files must be in WAV format
- Input image files must be in PNG format
- All audio sprite source files must be in the same exact format (incl. bitrate and channels)

## Credits

@vpmedia/phixify is developed by Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
