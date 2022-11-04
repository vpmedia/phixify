import { getPhaserAudioSprite } from "./getPhaserAudioSprite.js";
import { getPhaserImage } from "./getPhaserImage.js";
import { getPhaserSound } from "./getPhaserSound.js";
import { getPhaserSpriteSheet } from "./getPhaserSpriteSheet.js";
import { AUDIO_SPRITE, IMAGE, SOUND, SPRITE_SHEET } from "../../core/const.js";

/**
 * Generates a Phaser game engine asset pack manifest
 *
 * @param {object} config Reference to the configuration object
 * @param {object} manifestData TBD
 * @param {string} bundleName TBD
 * @param {string} assetPath TBD
 * @param {object} listMap TBD
 * @returns {object} TBD
 */
export const createPhaserManifest = (config, manifestData, bundleName, assetPath, listMap) => {
  const audioSpriteData = getPhaserAudioSprite(
    config,
    `${assetPath}${config.dir.audioSprite}/`,
    listMap[AUDIO_SPRITE]
  );
  const imageData = getPhaserImage(config, `${assetPath}${config.dir.image}/`, listMap[IMAGE]);
  const soundData = getPhaserSound(config, `${assetPath}${config.dir.sound}/`, listMap[SOUND]);
  const spriteSheetData = getPhaserSpriteSheet(
    config,
    `${assetPath}${config.dir.spriteSheet}/`,
    listMap[SPRITE_SHEET]
  );
  const bundle = {};
  bundle.files = [...audioSpriteData, ...imageData, ...soundData, ...spriteSheetData];
  manifestData[bundleName] = bundle;
  return manifestData;
};
