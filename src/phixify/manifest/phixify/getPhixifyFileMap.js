import { getFileList } from '../../tool/fileUtil.js';
import { AUDIO_SPRITE, IMAGE, SOUND, SPRITE_SHEET } from '../const.js';

/**
 * Returns the file list map for the manifest generator.
 * @param {object} config - The configuration object reference.
 * @param {string} targetPath - The path where the assets are stored.
 * @returns {object} TBD.
 */
export const getPhixifyFileMap = (config, targetPath) => {
  const audioSpriteList = getFileList(`${targetPath}${config.dir.audioSprite}`);
  const imageList = getFileList(`${targetPath}${config.dir.image}`);
  const soundList = getFileList(`${targetPath}${config.dir.sound}`);
  const spriteSheetList = getFileList(`${targetPath}${config.dir.spriteSheet}`).filter((item) => {
    return (
      // tricky: filter out sprite-sheet data variants for different formats used by pixi.js
      // sprite_data.png.json, sprite_data.webp.json, ...
      !item.name.endsWith('.avif') && !item.name.endsWith('.png') && !item.name.endsWith('.webp')
    );
  });
  const listMap = {};
  listMap[AUDIO_SPRITE] = audioSpriteList;
  listMap[IMAGE] = imageList;
  listMap[SOUND] = soundList;
  listMap[SPRITE_SHEET] = spriteSheetList;
  return listMap;
};
