/**
 * Creates the sound entries for the manifest object
 *
 * @param {object} config The configuration object reference
 * @param {string} assetPath The URL where the assets will be loaded from
 * @param {string} targetPath The path where the assets are stored
 * @returns {object} TBD
 */
import { SOUND } from "../core/const.js";
import { getFileList } from "../../tool/fileUtil.js";

export const getPixiSound = (config, assetPath, targetPath) => {
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
    const srcs = `${path}${key}.{${value.sort(sortFunc).toString()}}`;
    result.push({ name: key, srcs });
  });
  return result;
};
