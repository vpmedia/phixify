# Phixify

Phaser and Pixi.js game engine asset and manifest command line generator.

## Pre-requisites

- node.js v18.0
- imagemagick
- sox
- texture-packer
- ffmpeg (optional)

## Installation guide

### Ubuntu Linux

    $ curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    $ sudo apt-get update
    $ sudo apt-get install -y nodejs imagemagick sox ffmpeg

### MacOS

    $ brew update
    $ brew install node imagemagick sox ffmpeg

### Install TexturePacker for your platform

https://www.codeandweb.com/texturepacker/documentation/installation-and-licensing

## Getting started

### Show the CLI help

> When using the npm package locally:

    $ npm install --save-dev @vpmedia/phixify
    $ ./node_modules/.bin/phixify

> When using the npm package globally:

    $ npm install --global @vpmedia/phixify
    $ phixify

> When using the git repository:

    $ git clone git@github.com:vpmedia/phixify.git
    $ cd phixify
    $ ./phixify.sh

## Examples

https://github.com/vpmedia/phixify-example

## Comments

At the moment only tested in MacOS platform.

## Conventions

- Input audio files must be in WAV format
- Input image files must be in PNG format
- All audio sprite source files must be in the same exact format (incl. bitrate and channels)

## TODO

- Test in different platforms (Linux, Windows)

## Credits

@vpmedia/phixify is developed by Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
