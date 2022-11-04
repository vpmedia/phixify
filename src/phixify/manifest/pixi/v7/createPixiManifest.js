import { getPixiAudioSprite } from "./getPixiAudioSprite.js";
import { getPixiImage } from "./getPixiImage.js";
import { getPixiSound } from "./getPixiSound.js";
import { getPixiSpriteSheet } from "./getPixiSpriteSheet.js";
import { AUDIO_SPRITE, IMAGE, SOUND, SPRITE_SHEET } from "../../core/const.js";

/**
 * Creates a pixi.js game engine asset manifest bundle
 *
 * @param {object} config Reference to the configuration object
 * @param {object} manifestData TBD
 * @param {string} bundleName TBD
 * @param {string} assetPath TBD
 * @param {object} listMap TBD
 * @returns {object} TBD
 */
export const createPixiManifest = (config, manifestData, bundleName, assetPath, listMap) => {
  const audioSpriteData = getPixiAudioSprite(
    config,
    `${assetPath}${config.dir.audioSprite}/`,
    listMap[AUDIO_SPRITE]
  );
  const imageData = getPixiImage(config, `${assetPath}${config.dir.image}/`, listMap[IMAGE]);
  const soundData = getPixiSound(config, `${assetPath}${config.dir.sound}/`, listMap[SOUND]);
  const spriteSheetData = getPixiSpriteSheet(
    config,
    `${assetPath}${config.dir.spriteSheet}/`,
    listMap[SPRITE_SHEET]
  );
  const bundle = { name: bundleName };
  bundle.assets = [...audioSpriteData, ...imageData, ...soundData, ...spriteSheetData];
  manifestData.bundles.push(bundle);
  return manifestData;
};
