import { getPixiAudioSprite } from "./getPixiAudioSprite.js";
import { getPixiImage } from "./getPixiImage.js";
import { getPixiSound } from "./getPixiSound.js";
import { getPixiSpriteSheet } from "./getPixiSpriteSheet.js";

/**
 * Creates a pixi.js game engine asset manifest bundle
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
export const createPixiManifest = (
  config,
  manifestData,
  bundleName,
  assetPath,
  audioSpriteList,
  imageList,
  soundList,
  spriteSheetList
) => {
  const audioSpriteData = getPixiAudioSprite(
    config,
    `${assetPath}${config.dir.audioSprite}/`,
    audioSpriteList
  );
  const imageData = getPixiImage(config, `${assetPath}${config.dir.image}/`, imageList);
  const soundData = getPixiSound(config, `${assetPath}${config.dir.sound}/`, soundList);
  const spriteSheetData = getPixiSpriteSheet(
    config,
    `${assetPath}${config.dir.spriteSheet}/`,
    spriteSheetList
  );
  const bundle = { name: bundleName };
  bundle.assets = [...audioSpriteData, ...imageData, ...soundData, ...spriteSheetData];
  manifestData.bundles.push(bundle);
  return manifestData;
};
