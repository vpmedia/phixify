import type { PhaserFileBitmapFont, PhixifyConfig } from '../../types.js';
import { BITMAP_FONT } from '../const.js';
import { getFileList } from '../../tool/fileUtil.js';

/**
 * Creates the bitmap font entries for the manifest object.
 */
export const getPhaserBitmapFont = (
  config: PhixifyConfig,
  assetPath: string,
  targetPath: string,
): PhaserFileBitmapFont[] => {
  const dir = config.dir[BITMAP_FONT];
  const path = `${assetPath}${dir}/`;
  const list = getFileList(`${targetPath}${dir}`);
  const result: PhaserFileBitmapFont[] = [];
  list
    .filter((value) => value.ext === 'xml' || value.ext === 'fnt')
    .forEach((value) => {
      const key = value.name;
      const fontDataURL = `${path}${value.name}.${value.ext}`;
      const textureURL = `${path}${value.name}.png`;
      result.push({ type: 'bitmapFont', key, fontDataURL, textureURL });
    });
  return result;
};
