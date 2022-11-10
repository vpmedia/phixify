import { IMAGE } from "../const.js";
import { getFileList } from "../../tool/fileUtil.js";

/**
 * Creates the image entries for the manifest object
 *
 * @param {object} config The configuration reference
 * @param {string} assetPath The URL where the assets will be loaded from
 * @param {string} targetPath The path where the assets are stored
 * @returns {object[]} The assembled manifest list
 */
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
    const regExp = new RegExp("[@].*[x]");
    const resolution = regExp.test(value.name) ? value.name.match(regExp)[0] : null;
    const key = value.name.replace(regExp, "");
    map[key] = map[key] || { name: [], ext: [], res: [] };
    if (!map[key].name.includes(value.name)) {
      map[key].name.push(value.name);
    }
    if (!map[key].ext.includes(value.ext)) {
      map[key].ext.push(value.ext);
    }
    if (resolution && !map[key].res.includes(resolution)) {
      map[key].res.push(resolution);
    }
  });
  Object.entries(map).forEach(([key, value]) => {
    const res = value.res.length ? `{${value.res.toString()}}` : "";
    const ext = value.ext.sort(sortFunc).toString();
    const srcs = `${path}${key}${res}.{${ext}}`;
    result.push({ name: key, srcs });
  });
  return result;
};
