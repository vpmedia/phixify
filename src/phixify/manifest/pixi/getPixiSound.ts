import type { PhixifyConfig, PixiAsset } from '../../types.js';
import { getFileList } from '../../tool/fileUtil.js';
import { SOUND } from '../const.js';

/**
 * Creates the sound entries for the manifest object.
 */
export const getPixiSound = (config: PhixifyConfig, assetPath: string, targetPath: string): PixiAsset[] => {
  const dir = config.dir[SOUND];
  const path = `${assetPath}${dir}/`;
  const list = getFileList(`${targetPath}${dir}`);
  const formats = config.manifest.sound;
  const sortFunc = (a: string, b: string): number => {
    return formats.indexOf(a) - formats.indexOf(b);
  };
  const result: PixiAsset[] = [];
  const map: Record<string, string[]> = {};
  list.forEach((value) => {
    map[value.name] = map[value.name] || [];
    map[value.name].push(value.ext);
  });
  Object.entries(map).forEach(([key, value]) => {
    const src = `${path}${key}.{${value.sort(sortFunc).toString()}}`;
    result.push({ alias: key, src });
  });
  return result;
};
