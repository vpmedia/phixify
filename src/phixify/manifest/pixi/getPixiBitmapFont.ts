import type { PhixifyConfig, PixiAsset } from '../../types.js';
import { getFileList } from '../../tool/fileUtil.js';
import { BITMAP_FONT } from '../const.js';

/**
 * Creates the bitmap font entries for the manifest object.
 */
export const getPixiBitmapFont = (config: PhixifyConfig, assetPath: string, targetPath: string): PixiAsset[] => {
  const dir = config.dir[BITMAP_FONT];
  const path = `${assetPath}${dir}/`;
  const list = getFileList(`${targetPath}${dir}`);
  const result: PixiAsset[] = [];
  list
    .filter((value) => value.ext === 'xml' || value.ext === 'fnt')
    .forEach((value) => {
      const src = `${path}${value.name}.${value.ext}`;
      result.push({ alias: value.name, src });
    });
  return result;
};
