import { getPhaserAudioSprite } from "./getPhaserAudioSprite.js";
import { getPhaserData } from "./getPhaserData.js";
import { getPhaserImage } from "./getPhaserImage.js";
import { getPhaserSound } from "./getPhaserSound.js";
import { getPhaserSpriteSheet } from "./getPhaserSpriteSheet.js";
import { AUDIO_SPRITE, DATA, IMAGE, SOUND, SPRITE_SHEET } from "../const.js";

/**
 * Generates a Phaser game engine asset pack manifest
 *
 * @param {object} config The configuration object reference
 * @param {object} manifestData The output manifest object reference
 * @param {string} bundleName The asset bundle name
 * @param {string} assetPath The URL where the assets will be loaded from
 * @param {string} targetPath The path where the assets are stored
 * @returns {object} The output manifest object reference
 */
export const createPhaserManifest = (config, manifestData, bundleName, assetPath, targetPath) => {
  const manifestGenerators = [
    { type: AUDIO_SPRITE, generator: getPhaserAudioSprite },
    { type: IMAGE, generator: getPhaserImage },
    { type: SOUND, generator: getPhaserSound },
    { type: SPRITE_SHEET, generator: getPhaserSpriteSheet },
    { type: DATA, generator: getPhaserData },
  ];
  let files = [];
  manifestGenerators.forEach((item) => {
    const data = item.generator(config, assetPath, targetPath);
    files = [...files, ...data];
  });
  manifestData[bundleName] = { files };
  return manifestData;
};
