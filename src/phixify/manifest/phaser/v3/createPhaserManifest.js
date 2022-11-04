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
 * @param {string} targetPath TBD
 * @returns {object} TBD
 */
export const createPhaserManifest = (config, manifestData, bundleName, assetPath, targetPath) => {
  const manifestGenerators = [
    { type: AUDIO_SPRITE, generator: getPhaserAudioSprite },
    { type: IMAGE, generator: getPhaserImage },
    { type: SOUND, generator: getPhaserSound },
    { type: SPRITE_SHEET, generator: getPhaserSpriteSheet },
  ];
  let files = [];
  manifestGenerators.forEach((item) => {
    const data = item.generator(config, assetPath, targetPath);
    files = [...files, ...data];
  });
  manifestData[bundleName] = { files };
  return manifestData;
};
