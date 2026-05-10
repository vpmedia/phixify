import { statSync } from 'node:fs';
import type {
  FileEntry,
  PhixifyConfig,
  PhixifyFileInfoEntry,
  PhixifyManifestBundleData,
  PhixifyManifestResult,
} from '../../types.js';
import { AUDIO_SPRITE, IMAGE, SOUND, SPRITE_SHEET } from '../const.js';
import { getPhixifyFileMap } from './getPhixifyFileMap.js';
import { getPhixifyFileInfo } from './getPhixifyFileInfo.js';

/**
 * Creates a phixify asset manifest bundle.
 */
export const createPhixifyManifest = (
  config: PhixifyConfig,
  bundleName: string,
  assetPath: string,
  targetPath: string,
): Promise<PhixifyManifestResult> => {
  const manifestData: PhixifyManifestBundleData = {};
  const promises: Promise<PhixifyFileInfoEntry>[] = [];
  const listToMap = (list: FileEntry[], type: string): void => {
    const map: Record<string, Record<string, PhixifyFileInfoEntry>> = {};
    manifestData[type] = map;
    const dirKey = type as keyof PhixifyConfig['dir'];
    const sourcePath = `${targetPath}${config.dir[dirKey]}`;
    list.forEach((item) => {
      const filePath = `${sourcePath}/${item.name}.${item.ext}`;
      const fileStat = statSync(filePath);
      map[item.name] = map[item.name] || {};
      map[item.name][item.ext] = {
        size: fileStat.size,
        modified: fileStat.mtimeMs,
      };
      if (item.ext !== 'json') {
        const promise = getPhixifyFileInfo(config, sourcePath, item, type, manifestData);
        if (promise) {
          promises.push(promise);
        }
      }
    });
  };
  const listMap = getPhixifyFileMap(config, targetPath);
  listToMap(listMap[AUDIO_SPRITE], AUDIO_SPRITE);
  listToMap(listMap[IMAGE], IMAGE);
  listToMap(listMap[SOUND], SOUND);
  listToMap(listMap[SPRITE_SHEET], SPRITE_SHEET);
  return new Promise<PhixifyManifestResult>((resolve) => {
    Promise.all(promises).then(() => {
      resolve({ bundleName, manifestData });
    });
  });
};
