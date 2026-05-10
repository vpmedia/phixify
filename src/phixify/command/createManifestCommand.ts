import type { PhixifyCliOptions } from '../types.js';
import { createPixiManifestCommand } from './createPixiManifestCommand.js';
import { createPhaserManifestCommand } from './createPhaserManifestCommand.js';
import { createPhixifyManifestCommand } from './createPhixifyManifestCommand.js';
import { getConfig } from '../config/getConfig.js';
import { isFile, normalizePath } from '../tool/fileUtil.js';

/**
 * Command creating all manifest descriptors.
 */
export const createManifestCommand = (options: PhixifyCliOptions): void => {
  console.time('Manifests created');
  const config = getConfig(options);
  if (options.projectDir === '' && config.flag.multiProject) {
    console.error('Missing project-dir option');
    return;
  }
  const targetPath = normalizePath(`${config.basePath}${options.projectDir ?? ''}`);
  if (!isFile(targetPath)) {
    console.error('Target path does not exist', targetPath);
    return;
  }
  createPhixifyManifestCommand(options).then(() => {
    if (config.engine.pixi) {
      createPixiManifestCommand(options);
    }
    if (config.engine.phaser) {
      createPhaserManifestCommand(options);
    }
    console.timeEnd('Manifests created');
  });
};
