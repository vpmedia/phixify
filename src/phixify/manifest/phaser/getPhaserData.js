import { DATA } from "../const.js";
import { getFileList } from "../../tool/fileUtil.js";

/**
 * TBD.
 * @param {string} ext - TBD.
 * @returns {string} TBD.
 */
const getTypeByExt = (ext) => {
  if (ext === "txt") {
    return "text";
  }
  return ext;
};

/**
 * Creates the data entries for the manifest object.
 * @param {object} config - The configuration reference.
 * @param {string} assetPath - The URL where the assets will be loaded from.
 * @param {string} targetPath - The path where the assets are stored.
 * @returns {object[]} The assembled manifest list.
 */
export const getPhaserData = (config, assetPath, targetPath) => {
  const dir = config.dir[DATA];
  const path = `${assetPath}${dir}/`;
  const list = getFileList(`${targetPath}${dir}`);
  const result = [];
  list.forEach((value) => {
    const url = `${path}${value.name}.${value.ext}`;
    result.push({ type: getTypeByExt(value.ext), key: `${value.name}.${value.ext}`, url });
  });
  return result;
};
