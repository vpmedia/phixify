import type { PhixifyConfig, PixiAsset } from '../../types.js';
import { getFileList } from '../../tool/fileUtil.js';
import { SPRITE_SHEET } from '../const.js';

interface SpriteSheetMapEntry {
  name: string[];
  ext: string[];
  res: string[];
}

/**
 * Creates the sprite sheet entries for the manifest object.
 */
export const getPixiSpriteSheet = (
  config: PhixifyConfig,
  assetPath: string,
  targetPath: string,
): PixiAsset[] => {
  const dir = config.dir[SPRITE_SHEET];
  const path = `${assetPath}${dir}/`;
  const list = getFileList(`${targetPath}${dir}`).filter((item) => {
    return (
      // tricky: filter out sprite-sheet data variants for different formats used by pixi.js
      // sprite_data.png.json, sprite_data.webp.json, ...
      !item.name.endsWith('.avif') && !item.name.endsWith('.png') && !item.name.endsWith('.webp')
    );
  });
  const formats = config.manifest.image;
  const sortFunc = (a: string, b: string): number => {
    return formats.indexOf(a) - formats.indexOf(b);
  };
  const result: PixiAsset[] = [];
  const map: Record<string, SpriteSheetMapEntry> = {};
  list
    .filter((value) => value.ext !== 'json')
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
    const res = value.res.length ? `{${value.res.toString()}}` : '';
    const ext = value.ext.sort(sortFunc).toString();
    const src = `${path}${key}${res}.{${ext}}.json`;
    result.push({ alias: key, src });
  });
  return result;
};
