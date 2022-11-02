import { getDirectoryList, getFileList, normalizePath, writeJson } from "../tool/fileUtil.js";
import { createPixiManifest } from "../manifest/pixi/v7/createPixiManifest.js";
import { getPixiManifestTemplate } from "../manifest/pixi/v7/getPixiManifestTemplate.js";
import { getConfig } from "../config/getConfig.js";

/**
 * Runs the asset manifest generation command
 *
 * @param {object} config TBD
 * @param {string} bundleName TBD
 * @param {string} assetPath TBD
 * @param {string} targetPath TBD
 * @param {object} manifestData TBD
 */
const createManifestBundle = (config, bundleName, assetPath, targetPath, manifestData) => {
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
  createPixiManifest(
    config,
    manifestData,
    bundleName,
    assetPath,
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
export const createPixiManifestCommand = (options) => {
  const config = getConfig(options);
  const assetPath = normalizePath(`${config.assetPath}${options.projectDir}`);
  const targetPath = normalizePath(`${config.basePath}${options.projectDir}`);
  const manifestData = getPixiManifestTemplate(config);
  if (config.multiBundle) {
    const bundleList = getDirectoryList(targetPath);
    bundleList.forEach((bundle) => {
      const bundleAssetPath = `${assetPath}${bundle.name}/`;
      const bundleTargetPath = `${targetPath}${bundle.name}/`;
      createManifestBundle(config, bundle.name, bundleAssetPath, bundleTargetPath, manifestData);
    });
  } else {
    createManifestBundle(config, "main", assetPath, targetPath, manifestData);
  }
  writeJson(config, manifestData, `${targetPath}${config.output.pixi}`);
};
