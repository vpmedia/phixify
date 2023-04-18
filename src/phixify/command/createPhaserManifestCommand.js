import { getDirectoryList, normalizePath, writeJson } from "../tool/fileUtil.js";
import { createPhaserManifest } from "../manifest/phaser/createPhaserManifest.js";
import { getPhaserManifestTemplate } from "../manifest/phaser/getPhaserManifestTemplate.js";
import { getConfig } from "../config/getConfig.js";

/**
 * Command creating all manifest descriptors.
 * @param {object} options - TBD.
 * @param {string} options.configFile - TBD.
 * @param {string} options.projectDir - TBD.
 * @param {boolean} options.verbose - TBD.
 */
export const createPhaserManifestCommand = (options) => {
  const config = getConfig(options);
  const assetPath = normalizePath(`${config.assetPath}${options.projectDir}`);
  const targetPath = normalizePath(`${config.basePath}${options.projectDir}`);
  const manifestData = getPhaserManifestTemplate(config);
  if (config.flag.multiBundle) {
    const bundleList = getDirectoryList(targetPath);
    bundleList.forEach((bundle) => {
      const bundleAssetPath = `${assetPath}${bundle.name}/`;
      const bundleTargetPath = `${targetPath}${bundle.name}/`;
      createPhaserManifest(config, manifestData, bundle.name, bundleAssetPath, bundleTargetPath);
    });
  } else {
    createPhaserManifest(config, manifestData, "main", assetPath, targetPath);
  }
  writeJson(config, manifestData, `${targetPath}${config.output.phaser}`);
};
