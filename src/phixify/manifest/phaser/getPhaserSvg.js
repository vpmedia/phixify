import { SVG } from '../const.js';
import { getFileList } from '../../tool/fileUtil.js';

/**
 * TBD.
 * @param {string} ext - TBD.
 * @returns {string} TBD.
 */
const getTypeByExt = (ext) => {
  if (ext === 'svg') {
    return 'svg';
  }
  return ext;
};

/**
 * Creates the svg entries for the manifest object.
 * @param {object} config - The configuration reference.
 * @param {string} assetPath - The URL where the assets will be loaded from.
 * @param {string} targetPath - The path where the assets are stored.
 * @returns {object[]} The assembled manifest list.
 */
export const getPhaserSvg = (config, assetPath, targetPath) => {
  const dir = config.dir[SVG];
  const path = `${assetPath}${dir}/`;
  const list = getFileList(`${targetPath}${dir}`);
  const result = [];
  list.forEach((value) => {
    const url = `${path}${value.name}.${value.ext}`;
    result.push({ type: getTypeByExt(value.ext), key: `${value.name}.${value.ext}`, url });
  });
  return result;
};
