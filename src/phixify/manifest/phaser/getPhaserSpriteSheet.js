/**
 * Creates the sprite sheet entries for the manifest object
 *
 * @param {object} config The configuration object reference
 * @param {string} assetPath The URL where the assets will be loaded from
 * @param {string} targetPath The path where the assets are stored
 * @returns {object} TBD
 */
import { SPRITE_SHEET } from "../core/const.js";
import { getFileList } from "../../tool/fileUtil.js";

export const getPhaserSpriteSheet = (config, assetPath, targetPath) => {
  const dir = config.dir[SPRITE_SHEET];
  const path = `${assetPath}${dir}/`;
  const list = getFileList(`${targetPath}${dir}`).filter((item) => {
    return (
      // tricky: filter out sprite-sheet data variants for different formats used by pixi.js
      // sprite_data.png.json, sprite_data.webp.json, ...
      !item.name.endsWith(".avif") && !item.name.endsWith(".png") && !item.name.endsWith(".webp")
    );
  });
  const result = [];
  list
    .filter((value) => value.ext === "webp")
    .forEach((value) => {
      const atlasURL = `${path}${value.name}.webp.json`;
      const textureURL = `${path}${value.name}.webp`;
      result.push({ type: "atlas", key: value.name, textureURL, atlasURL });
    });
  return result;
};
