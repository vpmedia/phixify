import { getDirectoryList, isFile, normalizePath } from "../tool/fileUtil.js";
import { getConfig } from "../config/getConfig.js";
import { createAudioSprite } from "../asset/createAudioSprite.js";
import { createImage } from "../asset/createImage.js";
import { createSound } from "../asset/createSound.js";
import { createSpriteSheet } from "../asset/createSpriteSheet.js";

/**
 * Command creating all media assets
 *
 * @param {object} config TBD
 * @param {string} bundleName TBD
 * @param {string} targetPath TBD
 * @returns {Promise} TBD
 */
export const createAssetBundle = (config, bundleName, targetPath) => {
  if (config.options.verbose) {
    console.log("Creating asset bundle:", bundleName, targetPath);
  }
  const audioSpriteResult = createAudioSprite(config, targetPath);
  const imageResult = createImage(config, targetPath);
  const soundResult = createSound(config, targetPath);
  const spriteSheetResult = createSpriteSheet(config, targetPath);
  const promises = [audioSpriteResult, imageResult, soundResult, spriteSheetResult];
  return Promise.all(promises);
};

/**
 * Runs the asset file generation command
 *
 * @param {object} options TBD
 * @param {string=} options.configFile - TBD
 * @param {string} options.projectDir - TBD
 * @param {boolean} options.verbose - TBD
 * @returns {Promise} TBD
 */
export const createAssetCommand = (options) => {
  console.time("Assets created");
  const config = getConfig(options);
  const targetPath = normalizePath(`${config.basePath}${options.projectDir}`);
  if (!isFile(targetPath)) {
    console.error("Target path does not exist", targetPath);
    return null;
  }
  if (options.verbose) {
    console.log("Creating assets at:", targetPath);
  }
  const promises = [];
  if (config.multiBundle) {
    const bundleList = getDirectoryList(targetPath);
    bundleList.forEach((bundle) => {
      const createAssetResult = createAssetBundle(
        config,
        bundle.name,
        `${targetPath}${bundle.name}/`
      );
      promises.push(createAssetResult);
    });
  } else {
    const createAssetResult = createAssetBundle(config, "main", targetPath);
    promises.push(createAssetResult);
  }
  const createAllResult = Promise.all(promises);
  createAllResult.then(() => {
    console.timeEnd("Assets created");
  });
  return createAllResult;
};
