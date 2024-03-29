import { getFileList } from '../../tool/fileUtil.js';
import { AUDIO_SPRITE } from '../const.js';

/**
 * Creates the audio sprite entries for the manifest object.
 * @param {object} config - The configuration reference.
 * @param {string} assetPath - The URL where the assets will be loaded from.
 * @param {string} targetPath - The path where the assets are stored.
 * @returns {object[]} The assembled manifest list.
 */
export const getPixiAudioSprite = (config, assetPath, targetPath) => {
  const dir = config.dir[AUDIO_SPRITE];
  const path = `${assetPath}${dir}/`;
  const list = getFileList(`${targetPath}${dir}`);
  const formats = config.manifest.sound;
  const sortFunc = (a, b) => {
    return formats.indexOf(a) - formats.indexOf(b);
  };
  const result = [];
  // json
  list
    .filter((value) => value.ext === 'json')
    .forEach((value) => {
      result.push({
        alias: `${value.name}_data`,
        src: `${path}${value.name}.${value.ext}`,
      });
    });
  // audio
  const map = {};
  list
    .filter((value) => value.ext !== 'json')
    .forEach((value) => {
      map[value.name] = map[value.name] || [];
      map[value.name].push(value.ext);
    });
  Object.entries(map).forEach(([key, value]) => {
    const extensions = value.sort(sortFunc).toString();
    const src = `${path}${key}.{${extensions}}`;
    result.push({ alias: key, src });
  });
  return result;
};
