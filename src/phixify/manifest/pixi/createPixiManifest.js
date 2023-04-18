import { getPixiAudioSprite } from "./getPixiAudioSprite.js";
import { getPixiData } from "./getPixiData.js";
import { getPixiImage } from "./getPixiImage.js";
import { getPixiSound } from "./getPixiSound.js";
import { getPixiSpriteSheet } from "./getPixiSpriteSheet.js";
import { getPixiBitmapFont } from "./getPixiBitmapFont.js";
import { AUDIO_SPRITE, DATA, IMAGE, SOUND, SPRITE_SHEET, BITMAP_FONT } from "../const.js";

/**
 * Creates a pixi.js game engine asset manifest bundle.
 * @param {object} config - The configuration object reference.
 * @param {object} manifestData - The output manifest object reference.
 * @param {string} bundleName - The asset bundle name.
 * @param {string} assetPath - The URL where the assets will be loaded from.
 * @param {string} targetPath - The path where the assets are stored.
 * @returns {object} The output manifest object reference.
 */
export const createPixiManifest = (config, manifestData, bundleName, assetPath, targetPath) => {
  const manifestGenerators = [
    { type: AUDIO_SPRITE, generator: getPixiAudioSprite },
    { type: IMAGE, generator: getPixiImage },
    { type: SOUND, generator: getPixiSound },
    { type: SPRITE_SHEET, generator: getPixiSpriteSheet },
    { type: DATA, generator: getPixiData },
    { type: BITMAP_FONT, generator: getPixiBitmapFont },
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
