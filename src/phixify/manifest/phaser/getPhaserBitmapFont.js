import { BITMAP_FONT } from "../const.js";
import { getFileList } from "../../tool/fileUtil.js";

/**
 * Creates the bitmap font entries for the manifest object.
 * @param {object} config - The configuration reference.
 * @param {string} assetPath - The URL where the assets will be loaded from.
 * @param {string} targetPath - The path where the assets are stored.
 * @returns {object[]} The assembled manifest list.
 */
export const getPhaserBitmapFont = (config, assetPath, targetPath) => {
  const dir = config.dir[BITMAP_FONT];
  const path = `${assetPath}${dir}/`;
  const list = getFileList(`${targetPath}${dir}`);
  const result = [];
  list
    .filter((value) => value.ext === "xml" || value.ext === "fnt")
    .forEach((value) => {
      const key = value.name;
      const fontDataURL = `${path}${value.name}.${value.ext}`;
      const textureURL = `${path}${value.name}.png`;
      result.push({ type: "bitmapFont", key, fontDataURL, textureURL });
    });
  return result;
};
