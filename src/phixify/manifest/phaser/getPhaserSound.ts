import type { PhaserFileSound, PhixifyConfig } from '../../types.js';
import { SOUND } from '../const.js';
import { getFileList } from '../../tool/fileUtil.js';

/**
 * Creates the sound entries for the manifest object.
 */
export const getPhaserSound = (config: PhixifyConfig, assetPath: string, targetPath: string): PhaserFileSound[] => {
  const dir = config.dir[SOUND];
  const path = `${assetPath}${dir}/`;
  const list = getFileList(`${targetPath}${dir}`);
  const formats = config.manifest.sound;
  const sortFunc = (a: string, b: string): number => {
    return formats.indexOf(a) - formats.indexOf(b);
  };
  const result: PhaserFileSound[] = [];
  const map: Record<string, string[]> = {};
  list.forEach((value) => {
    map[value.name] = map[value.name] || [];
    map[value.name].push(value.ext);
  });
  Object.entries(map).forEach(([key, value]) => {
    const url = value.sort(sortFunc).map((ext) => {
      return `${path}${key}.${ext}`;
    });
    result.push({ type: 'audio', key, url });
  });
  return result;
};
