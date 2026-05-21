import type { PhixifyCliOptions, PhixifyConfig } from '../types.js';
import { getDirectoryList, isFile, normalizePath } from '../tool/fileUtil.js';
import { getConfig } from '../config/getConfig.js';
import { createAudioSprite } from '../asset/createAudioSprite.js';
import { createImage } from '../asset/createImage.js';
import { createSound } from '../asset/createSound.js';
import { createSpriteSheet } from '../asset/createSpriteSheet.js';

/**
 * Command creating all media assets.
 */
export const createAssetBundle = (
  config: PhixifyConfig,
  bundleName: string,
  targetPath: string
): Promise<unknown[]> => {
  if (config.options.verbose) {
    console.log('Creating asset bundle:', bundleName, targetPath);
  }
  const audioSpriteResult = createAudioSprite(config, targetPath);
  const imageResult = createImage(config, targetPath);
  const soundResult = createSound(config, targetPath);
  const spriteSheetResult = createSpriteSheet(config, targetPath);
  const promises: Promise<unknown>[] = [audioSpriteResult, imageResult, soundResult, spriteSheetResult];
  return Promise.all(promises);
};

/**
 * Runs the asset file generation command.
 */
export const createAssetCommand = (options: PhixifyCliOptions): Promise<unknown> | null => {
  console.time('Assets created');
  const config = getConfig(options);
  if (options.projectDir === '' && config.flag.multiProject) {
    console.error('Missing project-dir option');
    return null;
  }
  const targetPath = normalizePath(`${config.basePath}${options.projectDir ?? ''}`);
  if (!isFile(targetPath)) {
    console.error('Target path does not exist', targetPath);
    return null;
  }
  if (options.verbose) {
    console.log('Creating assets at:', targetPath);
  }
  const promises: Promise<unknown>[] = [];
  if (config.flag.multiBundle) {
    const bundleList = getDirectoryList(targetPath);
    bundleList.forEach((bundle) => {
      const createAssetResult = createAssetBundle(config, bundle.name, `${targetPath}${bundle.name}/`);
      promises.push(createAssetResult);
    });
  } else {
    const createAssetResult = createAssetBundle(config, 'main', targetPath);
    promises.push(createAssetResult);
  }
  const createAllResult = Promise.all(promises);
  createAllResult.then(() => {
    console.timeEnd('Assets created');
  });
  return createAllResult;
};
