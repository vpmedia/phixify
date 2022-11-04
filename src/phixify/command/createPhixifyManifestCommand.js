import { getDirectoryList, normalizePath, writeJson } from "../tool/fileUtil.js";
import { createPhixifyManifest } from "../manifest/phixify/v1/createPhixifyManifest.js";
import { getPhixifyManifestTemplate } from "../manifest/phixify/v1/getPhixifyManifestTemplate.js";
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
      const listMap = getManifestFileList(config, bundleAssetPath, bundleTargetPath);
      const promise = createPhixifyManifest(
        config,
        bundle.name,
        bundleAssetPath,
        bundleTargetPath,
        listMap
      );
      promises.push(promise);
    });
  } else {
    const listMap = getManifestFileList(config, assetPath, targetPath);
    const promise = createPhixifyManifest(config, "main", assetPath, targetPath, listMap);
    promises.push(promise);
  }
  Promise.all(promises).then((results) => {
    results.forEach((result) => {
      manifestData.bundles[result.bundleName] = result.manifestData;
    });
    writeJson(config, manifestData, `${targetPath}${config.output.phixify}`);
  });
};
