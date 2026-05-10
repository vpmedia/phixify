import type { PhixifyCliOptions } from '../types.js';
import { getDirectoryList, normalizePath, writeJson } from '../tool/fileUtil.js';
import { createPhaserManifest } from '../manifest/phaser/createPhaserManifest.js';
import { getPhaserManifestTemplate } from '../manifest/phaser/getPhaserManifestTemplate.js';
import { getConfig } from '../config/getConfig.js';

/**
 * Command creating Phaser manifest descriptor.
 */
export const createPhaserManifestCommand = (options: PhixifyCliOptions): void => {
  const config = getConfig(options);
  const projectDir = options.projectDir ?? '';
  const assetPath = normalizePath(`${config.assetPath}${projectDir}`);
  const targetPath = normalizePath(`${config.basePath}${projectDir}`);
  const manifestData = getPhaserManifestTemplate(config);
  if (config.flag.multiBundle) {
    const bundleList = getDirectoryList(targetPath);
    bundleList.forEach((bundle) => {
      const bundleAssetPath = `${assetPath}${bundle.name}/`;
      const bundleTargetPath = `${targetPath}${bundle.name}/`;
      createPhaserManifest(config, manifestData, bundle.name, bundleAssetPath, bundleTargetPath);
    });
  } else {
    createPhaserManifest(config, manifestData, 'main', assetPath, targetPath);
  }
  writeJson(config, manifestData, `${targetPath}${config.output.phaser}`);
};
