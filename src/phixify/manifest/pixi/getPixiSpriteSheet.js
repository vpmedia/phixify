import { SPRITE_SHEET } from "../const.js";
import { getFileList } from "../../tool/fileUtil.js";

/**
 * Creates the sprite sheet entries for the manifest object
 *
 * @param {object} config The configuration reference
 * @param {string} assetPath The URL where the assets will be loaded from
 * @param {string} targetPath The path where the assets are stored
 * @returns {object[]} The assembled manifest list
 */
export const getPixiSpriteSheet = (config, assetPath, targetPath) => {
  const dir = config.dir[SPRITE_SHEET];
  const path = `${assetPath}${dir}/`;
  const list = getFileList(`${targetPath}${dir}`).filter((item) => {
    return (
      // tricky: filter out sprite-sheet data variants for different formats used by pixi.js
      // sprite_data.png.json, sprite_data.webp.json, ...
      !item.name.endsWith(".avif") && !item.name.endsWith(".png") && !item.name.endsWith(".webp")
    );
  });
  const formats = config.manifest.image;
  const sortFunc = (a, b) => {
    return formats.indexOf(a) - formats.indexOf(b);
  };
  const result = [];
  const map = {};
  list
    .filter((value) => value.ext !== "json")
    .forEach((value) => {
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
    const srcs = `${path}${key}${res}.{${ext}}.json`;
    result.push({ name: key, srcs });
  });
  return result;
};
