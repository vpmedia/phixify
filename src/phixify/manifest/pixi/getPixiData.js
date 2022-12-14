import { DATA } from "../const.js";
import { getFileList } from "../../tool/fileUtil.js";

/**
 * Creates the data entries for the manifest object
 *
 * @param {object} config The configuration reference
 * @param {string} assetPath The URL where the assets will be loaded from
 * @param {string} targetPath The path where the assets are stored
 * @returns {object[]} The assembled manifest list
 */
export const getPixiData = (config, assetPath, targetPath) => {
  const dir = config.dir[DATA];
  const path = `${assetPath}${dir}/`;
  const list = getFileList(`${targetPath}${dir}`);
  const result = [];
  list.forEach((value) => {
    const srcs = `${path}${value.name}.${value.ext}`;
    result.push({ name: `${value.name}.${value.ext}`, srcs });
  });
  return result;
};
