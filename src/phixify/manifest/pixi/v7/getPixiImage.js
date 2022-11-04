/**
 * Creates the image entries for the manifest object
 *
 * @param {object} config Reference to the configuration object
 * @param {string} assetPath TBD
 * @param {string} targetPath TBD
 * @returns {object} TBD
 */
import { IMAGE } from "../../core/const.js";
import { getFileList } from "../../../tool/fileUtil.js";

export const getPixiImage = (config, assetPath, targetPath) => {
  const dir = config.dir[IMAGE];
  const path = `${assetPath}${dir}/`;
  const list = getFileList(`${targetPath}${dir}`);
  const formats = config.manifest.image;
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
    const srcs = `${path}${key}.{${value.sort(sortFunc).toString()}}`;
    result.push({ name: key, srcs });
  });
  return result;
};
