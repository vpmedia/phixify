import type { PhaserFileGeneric, PhixifyConfig } from '../../types.js';
import { IMAGE } from '../const.js';
import { getFileList } from '../../tool/fileUtil.js';

interface ImageMapEntry {
  name: string[];
  ext: string[];
  res: string[];
}

/**
 * Creates the image entries for the manifest object.
 */
export const getPhaserImage = (config: PhixifyConfig, assetPath: string, targetPath: string): PhaserFileGeneric[] => {
  const dir = config.dir[IMAGE];
  const path = `${assetPath}${dir}/`;
  const list = getFileList(`${targetPath}${dir}`);
  const result: PhaserFileGeneric[] = [];
  const map: Record<string, ImageMapEntry> = {};
  list
    .filter((value) => value.ext === 'webp')
    .forEach((value) => {
      const regExp = /[@].*[x]/;
      const match = value.name.match(regExp);
      const resolution = match ? match[0] : null;
      const key = value.name.replace(regExp, '');
      map[key] = map[key] || { name: [], ext: [], res: [] };
      if (!map[key].name.includes(value.name)) {
        map[key].name.push(value.name);
      }
      if (!map[key].ext.includes(value.ext)) {
        map[key].ext.push(value.ext);
      }
      if (resolution && !map[key].res.includes(resolution)) {
        map[key].res.push(resolution);
      }
    });
  Object.entries(map).forEach(([key, value]) => {
    const res = value.res.length ? '@1x' : '';
    const url = `${path}${key}${res}.${value.ext.toString()}`;
    result.push({ type: 'image', key, url });
  });
  return result;
};
