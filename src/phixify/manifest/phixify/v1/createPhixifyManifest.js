import { statSync } from "fs";
import { imageInfo } from "../../../tool/imageInfo.js";
import { audioInfo } from "../../../tool/audioInfo.js";
/**
 * Creates a phixify asset manifest bundle
 *
 * @param {object} config Reference to the configuration object
 * @param {string} bundleName TBD
 * @param {string} assetPath TBD
 * @param {string} targetPath TBD
 * @param {object[]} audioSpriteList TBD
 * @param {string} audioSpriteList[].name - TBD
 * @param {string} audioSpriteList[].ext - TBD
 * @param {object[]} imageList TBD
 * @param {string} imageList[].name - TBD
 * @param {string} imageList[].ext - TBD
 * @param {object[]} soundList TBD
 * @param {string} soundList[].name - TBD
 * @param {string} soundList[].ext - TBD
 * @param {object[]} spriteSheetList TBD
 * @param {string} spriteSheetList[].name - TBD
 * @param {string} spriteSheetList[].ext - TBD
 * @returns {Promise} TBD
 */
export const createPhixifyManifest = (
  config,
  bundleName,
  assetPath,
  targetPath,
  audioSpriteList,
  imageList,
  soundList,
  spriteSheetList
) => {
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
        const promise = fileInfo(config, sourcePath, item, type, manifestData);
        promises.push(promise);
      }
    });
  };
  listToMap(audioSpriteList, "audioSprite");
  listToMap(imageList, "image");
  listToMap(soundList, "sound");
  listToMap(spriteSheetList, "spriteSheet");
  return new Promise((resolve) => {
    Promise.all(promises).then(() => {
      resolve({ bundleName, manifestData });
    });
  });
};

/**
 * TBD
 *
 * @param {object} config TBD
 * @param {string} sourcePath TBD
 * @param {object} item TBD
 * @param {string} type TBD
 * @param {object} manifestData TBD
 * @returns {Promise} TBD
 */
const fileInfo = (config, sourcePath, item, type, manifestData) => {
  const filePath = `${sourcePath}/${item.name}.${item.ext}`;
  const manifestEntry = manifestData[type][item.name][item.ext];
  if (type === "image" || type === "spriteSheet") {
    return imageInfo(config, filePath).then((result) => {
      manifestEntry.info = result;
      return manifestEntry;
    });
  } else {
    return audioInfo(config, filePath).then((result) => {
      manifestEntry.info = result;
      return manifestEntry;
    });
  }
};
