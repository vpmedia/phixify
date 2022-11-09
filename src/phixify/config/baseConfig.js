/**
 * @typedef {object} baseConfig
 * @property {string} basePath TBD
 * @property {string} assetPath TBD
 * @property {boolean} cache TBD
 * @property {boolean} multiProject TBD
 * @property {boolean} multiBundle TBD
 * @property {object} engine TBD
 * @property {object} output TBD
 * @property {object} dir TBD
 * @property {object} asset TBD
 * @property {object} manifest TBD
 * @property {object} tool TBD
 * @property {object} cmd TBD
 * @property {object} phixify TBD
 * @property {object} options TBD
 * @see https://imagemagick.org/script/command-line-options.php
 * @see https://sox.sourceforge.net/soxformat.html
 * @see https://ffmpeg.org/ffmpeg.html#Audio-Options
 * @see https://www.codeandweb.com/texturepacker/documentation/texture-settings
 */

/**
 * @type {object}
 */
export const baseConfig = {
  basePath: "./asset/",
  assetPath: "/asset/",
  multiProject: false,
  multiBundle: false,
  engine: {
    pixi_v7: true,
    phaser_v3: true,
    phixify: true,
  },
  output: {
    pixi: "pixi_resource.json",
    phaser: "phaser_resource.json",
    phixify: "phixify_resource.json",
  },
  dir: {
    audioSprite: "audiosprite",
    audioSpriteSource: "audiosprite-source",
    bitmapFont: "bitmapfont",
    data: "data",
    image: "image",
    sound: "sound",
    spriteSheet: "spritesheet",
    spriteSheetSource: "spritesheet-source",
  },
  asset: {
    image: ["avif", "webp"],
    sound: ["mp3", "ogg"],
  },
  manifest: {
    image: ["avif", "webp", "png"],
    sound: ["mp3", "ogg", "wav"],
  },
  tool: {
    image: "sharp",
    sound: "sox",
    spriteSheet: "texturePacker",
  },
  cmd: {
    texturePacker: {
      path: "TexturePacker",
      opts: {
        png: [
          "--format pixijs4",
          "--disable-rotation",
          "--force-squared",
          "--size-constraints POT",
          "--trim-sprite-names",
        ],
      },
    },
    imageMagick: {
      path: "magick",
      opts: {
        avif: ["-quality 90"],
        webp: ["-quality 90"],
      },
    },
    sharp: {
      opts: {
        avif: { quality: 90 },
        webp: { quality: 90 },
      },
    },
    sox: {
      path: "sox",
      opts: {
        mp3: ["-C 128.50"],
        ogg: ["-C 4"],
      },
    },
    ffmpeg: {
      path: "ffmpeg",
      opts: {
        mp3: [],
        ogg: [],
      },
    },
    ffprobe: {
      path: "ffprobe",
    },
  },
  phixify: {
    name: "@vpmedia/phixify",
    url: "https://github.com/vpmedia/phixify",
    version: "1.0.4",
    copyright: "Copyright (c) Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)",
    timestamp: new Date().getTime().toString(),
  },
};
