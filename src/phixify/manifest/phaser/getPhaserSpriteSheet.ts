import type { PhaserFileAtlas, PhixifyConfig } from '../../types.js';
import { SPRITE_SHEET } from '../const.js';
import { getFileList } from '../../tool/fileUtil.js';

/**
 * Creates the sprite sheet entries for the manifest object.
 */
export const getPhaserSpriteSheet = (
  config: PhixifyConfig,
  assetPath: string,
  targetPath: string,
): PhaserFileAtlas[] => {
  const dir = config.dir[SPRITE_SHEET];
  const path = `${assetPath}${dir}/`;
  const list = getFileList(`${targetPath}${dir}`).filter((item) => {
    return (
      // tricky: filter out sprite-sheet data variants for different formats used by pixi.js
      // sprite_data.png.json, sprite_data.webp.json, ...
      !item.name.endsWith('.avif') && !item.name.endsWith('.png') && !item.name.endsWith('.webp')
    );
  });
  const result: PhaserFileAtlas[] = [];
  list
    .filter((value) => value.ext === 'webp')
    .filter((value) => !value.name.includes('@') || value.name.includes('@1x'))
    .forEach((value) => {
      const atlasURL = `${path}${value.name}.webp.json`;
      const textureURL = `${path}${value.name}.webp`;
      const key = value.name.replace('@1x', '');
      result.push({ type: 'atlas', key, textureURL, atlasURL });
    });
  return result;
};
