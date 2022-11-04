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
  const manifestGenerators = [
    { type: AUDIO_SPRITE, generator: getPixiAudioSprite },
    { type: IMAGE, generator: getPixiImage },
    { type: SOUND, generator: getPixiSound },
    { type: SPRITE_SHEET, generator: getPixiSpriteSheet },
  ];
  let assets = [];
  manifestGenerators.forEach((item) => {
    const path = `${assetPath}${config.dir[item.type]}/`;
    const data = item.generator(config, path, listMap[item.type]);
    assets = [...assets, ...data];
  });
  const bundle = { name: bundleName, assets };
  manifestData.bundles.push(bundle);
  return manifestData;
};
