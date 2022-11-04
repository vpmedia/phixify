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

export const getPhaserImage = (config, assetPath, targetPath) => {
  const dir = config.dir[IMAGE];
  const path = `${assetPath}${dir}/`;
  const list = getFileList(`${targetPath}${dir}`);
  const result = [];
  list
    .filter((value) => value.ext === "webp")
    .forEach((value) => {
      const url = `${path}${value.name}.${value.ext}`;
      result.push({ type: "image", key: value.name, url });
    });
  return result;
};
