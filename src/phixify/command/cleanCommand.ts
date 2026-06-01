import { rm } from 'node:fs/promises';
import { readdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import type { PhixifyCliOptions } from '../types.js';
import { getConfig } from '../config/getConfig.js';
import { getDirectoryList, isFile, normalizePath } from '../tool/fileUtil.js';

const cleanTarget = (options: PhixifyCliOptions, targetPath: string): Promise<void[]> => {
  const config = getConfig(options);
  const promises: Promise<void>[] = [];
  const spriteSheetPath = normalizePath(`${targetPath}${config.dir.spriteSheet}`);
  if (existsSync(spriteSheetPath)) {
    console.error('Deleting:', spriteSheetPath);
    promises.push(rm(spriteSheetPath, { recursive: true }));
  }
  const audioSpritePath = normalizePath(`${targetPath}${config.dir.audioSprite}`);
  if (existsSync(audioSpritePath)) {
    console.error('Deleting:', audioSpritePath);
    promises.push(rm(audioSpritePath, { recursive: true }));
  }
  const deleteExts = ['.avif', '.webp', '.mp3', '.ogg'];
  readdirSync(targetPath, { withFileTypes: true }).forEach((item) => {
    if (item.isDirectory() && item.name !== config.dir.spriteSheet && item.name !== config.dir.audioSprite) {
      readdirSync(`${targetPath}${item.name}`, { withFileTypes: true }).forEach((subItem) => {
        if (!subItem.isDirectory()) {
          const parsedPath = path.parse(subItem.name);
          if (deleteExts.includes(parsedPath.ext)) {
            const deletePath = `${targetPath}${item.name}/${subItem.name}`;
            promises.push(rm(deletePath));
          }
        }
      });
    }
  });
  return Promise.all(promises);
};

/**
 * Cleanup generated files.
 */
export const cleanCommand = (options: PhixifyCliOptions): Promise<void[][]> | null => {
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
  const promises: Promise<void[]>[] = [];
  if (config.flag.multiBundle) {
    const bundleList = getDirectoryList(targetPath);
    bundleList.forEach((bundle) => {
      const bundleTargetPath = `${targetPath}${bundle.name}/`;
      promises.push(cleanTarget(options, bundleTargetPath));
    });
  } else {
    promises.push(cleanTarget(options, targetPath));
  }
  return Promise.all(promises);
};
