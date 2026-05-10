import type { PhixifyCliOptions, PhixifyManifestResult } from '../types.js';
import { getDirectoryList, normalizePath, writeJson } from '../tool/fileUtil.js';
import { createPhixifyManifest } from '../manifest/phixify/createPhixifyManifest.js';
import { getPhixifyManifestTemplate } from '../manifest/phixify/getPhixifyManifestTemplate.js';
import { getConfig } from '../config/getConfig.js';
import { createAudioManifest } from '../manifest/phixify/createAudioManifest.js';

/**
 * Command creating phixify manifest descriptor and audio manifest per bundle.
 */
export const createPhixifyManifestCommand = (options: PhixifyCliOptions): Promise<PhixifyManifestResult[]> => {
  const config = getConfig(options);
  const projectDir = options.projectDir ?? '';
  const assetPath = normalizePath(`${config.assetPath}${projectDir}`);
  const targetPath = normalizePath(`${config.basePath}${projectDir}`);
  const manifestData = getPhixifyManifestTemplate(config);
  const promises: Promise<PhixifyManifestResult>[] = [];
  if (config.flag.multiBundle) {
    const bundleList = getDirectoryList(targetPath);
    bundleList.forEach((bundle) => {
      const bundleAssetPath = `${assetPath}${bundle.name}/`;
      const bundleTargetPath = `${targetPath}${bundle.name}/`;
      const promise = createPhixifyManifest(config, bundle.name, bundleAssetPath, bundleTargetPath);
      promises.push(promise);
    });
  } else {
    const promise = createPhixifyManifest(config, 'main', assetPath, targetPath);
    promises.push(promise);
  }
  return Promise.all(promises).then((results) => {
    results.forEach((result) => {
      manifestData.bundles[result.bundleName] = result.manifestData;
      createAudioManifest(options, result.bundleName, result.manifestData);
    });
    writeJson(config, manifestData, `${targetPath}${config.output.phixify}`);
    return results;
  });
};
