import { getDirectoryList, normalizePath, writeJson } from "../tool/fileUtil.js";
import { createPixiManifest } from "../manifest/pixi/createPixiManifest.js";
import { getPixiManifestTemplate } from "../manifest/pixi/getPixiManifestTemplate.js";
import { getConfig } from "../config/getConfig.js";

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
  if (config.flag.multiBundle) {
    const bundleList = getDirectoryList(targetPath);
    bundleList.forEach((bundle) => {
      const bundleAssetPath = `${assetPath}${bundle.name}/`;
      const bundleTargetPath = `${targetPath}${bundle.name}/`;
      createPixiManifest(config, manifestData, bundle.name, bundleAssetPath, bundleTargetPath);
    });
  } else {
    createPixiManifest(config, manifestData, "main", assetPath, targetPath);
  }
  writeJson(config, manifestData, `${targetPath}${config.output.pixi}`);
};
