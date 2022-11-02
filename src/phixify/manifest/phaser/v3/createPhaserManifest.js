import { getPhaserAudioSprite } from "./getPhaserAudioSprite.js";
import { getPhaserImage } from "./getPhaserImage.js";
import { getPhaserSound } from "./getPhaserSound.js";
import { getPhaserSpriteSheet } from "./getPhaserSpriteSheet.js";

/**
 * Generates a Phaser game engine asset pack manifest
 *
 * @param {object} config Reference to the configuration object
 * @param {object} manifestData TBD
 * @param {string} bundleName TBD
 * @param {string} assetPath TBD
 * @param {object[]} audioSpriteList TBD
 * @param {string} audioSpriteList[].name - TBD
 * @param {string} audioSpriteList[].ext - TBD
 * @param {object[]} imageList TBD
 * @param {string} imageList[].name - TBD
 * @param {string} imageList[].ext - TBD
 * @param {object[]} soundList TBD
 * @param {string} soundList[].name - TBD
 * @param {string} soundList[].ext - TBD
 * @param {object[]} spriteSheetList TBD
 * @param {string} spriteSheetList[].name - TBD
 * @param {string} spriteSheetList[].ext - TBD
 * @returns {object} TBD
 */
export const createPhaserManifest = (
  config,
  manifestData,
  bundleName,
  assetPath,
  audioSpriteList,
  imageList,
  soundList,
  spriteSheetList
) => {
  const audioSpriteData = getPhaserAudioSprite(
    config,
    `${assetPath}${config.dir.audioSprite}/`,
    audioSpriteList
  );
  const imageData = getPhaserImage(config, `${assetPath}${config.dir.image}/`, imageList);
  const soundData = getPhaserSound(config, `${assetPath}${config.dir.sound}/`, soundList);
  const spriteSheetData = getPhaserSpriteSheet(
    config,
    `${assetPath}${config.dir.spriteSheet}/`,
    spriteSheetList
  );
  const bundle = {};
  bundle.files = [...audioSpriteData, ...imageData, ...soundData, ...spriteSheetData];
  manifestData[bundleName] = bundle;
  return manifestData;
};
