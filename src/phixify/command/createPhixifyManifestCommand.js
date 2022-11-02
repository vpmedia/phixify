import { getDirectoryList, getFileList, normalizePath, writeJson } from "../tool/fileUtil.js";
import { createPhixifyManifest } from "../manifest/phixify/v1/createPhixifyManifest.js";
import { getPhixifyManifestTemplate } from "../manifest/phixify/v1/getPhixifyManifestTemplate.js";
import { getConfig } from "../config/getConfig.js";

/**
 * Runs the asset manifest generation command
 *
 * @param {object} config TBD
 * @param {string} bundleName TBD
 * @param {string} assetPath TBD
 * @param {string} targetPath TBD
 * @returns {Promise} TBD
 */
const createManifestBundle = (config, bundleName, assetPath, targetPath) => {
  const audioSpriteList = getFileList(`${targetPath}${config.dir.audioSprite}`);
  const imageList = getFileList(`${targetPath}${config.dir.image}`);
  const soundList = getFileList(`${targetPath}${config.dir.sound}`);
  const spriteSheetList = getFileList(`${targetPath}${config.dir.spriteSheet}`).filter((item) => {
    return (
      // tricky: filter out sprite-sheet data variants for different formats used by pixi.js
      // sprite_data.png.json, sprite_data.webp.json, ...
      !item.name.endsWith(".avif") && !item.name.endsWith(".png") && !item.name.endsWith(".webp")
    );
  });
  return createPhixifyManifest(
    config,
    bundleName,
    assetPath,
    targetPath,
    audioSpriteList,
    imageList,
    soundList,
    spriteSheetList
  );
};

/**
 * Command creating all manifest descriptors
 *
 * @param {object} options TBD
 * @param {string=} options.configFile - TBD
 * @param {string} options.projectDir - TBD
 * @param {boolean} options.verbose - TBD
 */
export const createPhixifyManifestCommand = (options) => {
  const config = getConfig(options);
  const assetPath = normalizePath(`${config.assetPath}${options.projectDir}`);
  const targetPath = normalizePath(`${config.basePath}${options.projectDir}`);
  const manifestData = getPhixifyManifestTemplate(config);
  const promises = [];
  if (config.multiBundle) {
    const bundleList = getDirectoryList(targetPath);
    bundleList.forEach((bundle) => {
      const bundleAssetPath = `${assetPath}${bundle.name}/`;
      const bundleTargetPath = `${targetPath}${bundle.name}/`;
      const promise = createManifestBundle(config, bundle.name, bundleAssetPath, bundleTargetPath);
      promises.push(promise);
    });
  } else {
    const promise = createManifestBundle(config, "main", assetPath, targetPath);
    promises.push(promise);
  }
  Promise.all(promises).then((results) => {
    results.forEach((result) => {
      manifestData.bundles[result.bundleName] = result.manifestData;
    });
    writeJson(config, manifestData, `${targetPath}${config.output.phixify}`);
  });
};
