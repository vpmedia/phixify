import { getFileList } from '../../tool/fileUtil.js';
import { SVG } from '../const.js';

/**
 * Creates the svg entries for the manifest object.
 * @param {object} config - The configuration reference.
 * @param {string} assetPath - The URL where the assets will be loaded from.
 * @param {string} targetPath - The path where the assets are stored.
 * @returns {object[]} The assembled manifest list.
 */
export const getPixiSvg = (config, assetPath, targetPath) => {
  const dir = config.dir[SVG];
  const path = `${assetPath}${dir}/`;
  const list = getFileList(`${targetPath}${dir}`);
  const result = [];
  list.forEach((value) => {
    const src = `${path}${value.name}.${value.ext}`;
    result.push({ alias: `${value.name}.${value.ext}`, src });
  });
  return result;
};
