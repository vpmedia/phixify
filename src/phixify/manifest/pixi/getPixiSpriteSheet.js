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
      map[value.name] = map[value.name] || [];
      map[value.name].push(value.ext);
    });
  list
    .filter((value) => value.ext === "json")
    .forEach((value) => {
      const extensions = map[value.name].sort(sortFunc).toString();
      const srcs = `${path}${value.name}.{${extensions}}.${value.ext}`;
      result.push({ name: value.name, srcs });
    });
  return result;
};
