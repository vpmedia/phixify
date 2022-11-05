import { statSync } from "fs";
import { AUDIO_SPRITE, IMAGE, SOUND, SPRITE_SHEET } from "../const.js";
import { getPhixifyFileMap } from "./getPhixifyFileMap.js";
import { getPhixifyFileInfo } from "./getPhixifyFileInfo.js";
/**
 * Creates a phixify asset manifest bundle
 *
 * @param {object} config The configuration object reference
 * @param {string} bundleName The asset bundle name
 * @param {string} assetPath The URL where the assets will be loaded from
 * @param {string} targetPath The path where the assets are stored
 * @returns {Promise} TBD
 */
export const createPhixifyManifest = (config, bundleName, assetPath, targetPath) => {
  const manifestData = {};
  const promises = [];
  const listToMap = (list, type) => {
    const map = {};
    manifestData[type] = map;
    const sourcePath = `${targetPath}${config.dir[type]}`;
    list.forEach((item) => {
      const filePath = `${sourcePath}/${item.name}.${item.ext}`;
      const fileStat = statSync(filePath);
      map[item.name] = map[item.name] || {};
      map[item.name][item.ext] = {
        size: fileStat.size,
        modified: fileStat.mtimeMs,
      };
      if (item.ext !== "json") {
        const promise = getPhixifyFileInfo(config, sourcePath, item, type, manifestData);
        promises.push(promise);
      }
    });
  };
  const listMap = getPhixifyFileMap(config, targetPath);
  listToMap(listMap[AUDIO_SPRITE], AUDIO_SPRITE);
  listToMap(listMap[IMAGE], IMAGE);
  listToMap(listMap[SOUND], SOUND);
  listToMap(listMap[SPRITE_SHEET], SPRITE_SHEET);
  return new Promise((resolve) => {
    Promise.all(promises).then(() => {
      resolve({ bundleName, manifestData });
    });
  });
};
