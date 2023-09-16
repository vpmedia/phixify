import { SOUND } from '../const.js';
import { getFileList } from '../../tool/fileUtil.js';

/**
 * Creates the sound entries for the manifest object.
 * @param {object} config - The configuration reference.
 * @param {string} assetPath - The URL where the assets will be loaded from.
 * @param {string} targetPath - The path where the assets are stored.
 * @returns {object[]} The assembled manifest list.
 */
export const getPhaserSound = (config, assetPath, targetPath) => {
  const dir = config.dir[SOUND];
  const path = `${assetPath}${dir}/`;
  const list = getFileList(`${targetPath}${dir}`);
  const formats = config.manifest.sound;
  const sortFunc = (a, b) => {
    return formats.indexOf(a) - formats.indexOf(b);
  };
  const result = [];
  const map = {};
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
