import { getDirectoryList, normalizePath, writeJson } from "../tool/fileUtil.js";
import { createPhaserManifest } from "../manifest/phaser/v3/createPhaserManifest.js";
import { getPhaserManifestTemplate } from "../manifest/phaser/v3/getPhaserManifestTemplate.js";
import { getConfig } from "../config/getConfig.js";
import { getManifestFileList } from "../manifest/core/getManifestFileList.js";

/**
 * Command creating all manifest descriptors
 *
 * @param {object} options TBD
 * @param {string=} options.configFile - TBD
 * @param {string} options.projectDir - TBD
 * @param {boolean} options.verbose - TBD
 */
export const createPhaserManifestCommand = (options) => {
  const config = getConfig(options);
  const assetPath = normalizePath(`${config.assetPath}${options.projectDir}`);
  const targetPath = normalizePath(`${config.basePath}${options.projectDir}`);
  const manifestData = getPhaserManifestTemplate(config);
  if (config.multiBundle) {
    const bundleList = getDirectoryList(targetPath);
    bundleList.forEach((bundle) => {
      const bundleAssetPath = `${assetPath}${bundle.name}/`;
      const bundleTargetPath = `${targetPath}${bundle.name}/`;
      const listMap = getManifestFileList(config, bundleAssetPath, bundleTargetPath);
      createPhaserManifest(config, manifestData, bundle.name, bundleAssetPath, listMap);
    });
  } else {
    const listMap = getManifestFileList(config, assetPath, targetPath);
    createPhaserManifest(config, manifestData, "main", assetPath, listMap);
  }
  writeJson(config, manifestData, `${targetPath}${config.output.phaser}`);
};
