import type { PhixifyCliOptions } from '../types.js';
import { getDirectoryList, normalizePath, writeJson } from '../tool/fileUtil.js';
import { createPixiManifest } from '../manifest/pixi/createPixiManifest.js';
import { getPixiManifestTemplate } from '../manifest/pixi/getPixiManifestTemplate.js';
import { getConfig } from '../config/getConfig.js';

/**
 * Command creating Pixi manifest descriptor.
 */
export const createPixiManifestCommand = (options: PhixifyCliOptions): void => {
  const config = getConfig(options);
  const projectDir = options.projectDir ?? '';
  const assetPath = normalizePath(`${config.assetPath}${projectDir}`);
  const targetPath = normalizePath(`${config.basePath}${projectDir}`);
  const manifestData = getPixiManifestTemplate(config);
  if (config.flag.multiBundle) {
    const bundleList = getDirectoryList(targetPath);
    bundleList.forEach((bundle) => {
      const bundleAssetPath = `${assetPath}${bundle.name}/`;
      const bundleTargetPath = `${targetPath}${bundle.name}/`;
      createPixiManifest(config, manifestData, bundle.name, bundleAssetPath, bundleTargetPath);
    });
  } else {
    createPixiManifest(config, manifestData, 'main', assetPath, targetPath);
  }
  writeJson(config, manifestData, `${targetPath}${config.output.pixi}`);
};
