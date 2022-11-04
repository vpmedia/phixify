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
 * @param {string} targetPath TBD
 * @returns {object} TBD
 */
export const createPixiManifest = (config, manifestData, bundleName, assetPath, targetPath) => {
  const manifestGenerators = [
    { type: AUDIO_SPRITE, generator: getPixiAudioSprite },
    { type: IMAGE, generator: getPixiImage },
    { type: SOUND, generator: getPixiSound },
    { type: SPRITE_SHEET, generator: getPixiSpriteSheet },
  ];
  let assets = [];
  manifestGenerators.forEach((item) => {
    const data = item.generator(config, assetPath, targetPath);
    assets = [...assets, ...data];
  });
  const bundle = { name: bundleName, assets };
  manifestData.bundles.push(bundle);
  return manifestData;
};
