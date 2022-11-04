/**
 * Creates the sound entries for the manifest object
 *
 * @param {object} config Reference to the configuration object
 * @param {string} assetPath TBD
 * @param {string} targetPath TBD
 * @returns {object} TBD
 */
import { SOUND } from "../../core/const.js";
import { getFileList } from "../../../tool/fileUtil.js";

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
    result.push({ type: "audio", key, url });
  });
  return result;
};
