import type { PhixifyConfig, PixiAsset } from '../../types.js';
import { getFileList } from '../../tool/fileUtil.js';
import { IMAGE } from '../const.js';

interface ImageMapEntry {
  name: string[];
  ext: string[];
  res: string[];
}

/**
 * Creates the image entries for the manifest object.
 */
export const getPixiImage = (config: PhixifyConfig, assetPath: string, targetPath: string): PixiAsset[] => {
  const dir = config.dir[IMAGE];
  const path = `${assetPath}${dir}/`;
  const list = getFileList(`${targetPath}${dir}`);
  const formats = config.manifest.image;
  const sortFunc = (a: string, b: string): number => {
    return formats.indexOf(a) - formats.indexOf(b);
  };
  const result: PixiAsset[] = [];
  const map: Record<string, ImageMapEntry> = {};
  list.forEach((value) => {
    const regExp = new RegExp('[@].*[x]');
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
    const res = value.res.length ? `{${value.res.toString()}}` : '';
    const ext = value.ext.sort(sortFunc).toString();
    const src = `${path}${key}${res}.{${ext}}`;
    result.push({ alias: key, src });
  });
  return result;
};
