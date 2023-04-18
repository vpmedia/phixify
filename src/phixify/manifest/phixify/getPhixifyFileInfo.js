import { AUDIO_SPRITE, IMAGE, SOUND, SPRITE_SHEET } from "../const.js";
import { imageInfo } from "../../tool/imageInfo.js";
import { audioInfo } from "../../tool/audioInfo.js";

/**
 * TBD.
 * @param {object} config - The configuration object reference.
 * @param {string} sourcePath - TBD.
 * @param {object} item - TBD.
 * @param {string} type - TBD.
 * @param {object} manifestData - TBD.
 * @returns {Promise} TBD.
 */
export const getPhixifyFileInfo = (config, sourcePath, item, type, manifestData) => {
  const filePath = `${sourcePath}/${item.name}.${item.ext}`;
  const manifestEntry = manifestData[type][item.name][item.ext];
  if (type === IMAGE || type === SPRITE_SHEET) {
    return imageInfo(config, filePath).then((result) => {
      if (config.tool.image === "sharp") {
        delete result.exif;
        delete result.icc;
        delete result.xmp;
        delete result.iptc;
      }
      manifestEntry.info = result;
      return manifestEntry;
    });
  } else if (type === AUDIO_SPRITE || type === SOUND) {
    return audioInfo(config, filePath).then((result) => {
      manifestEntry.info = result;
      return manifestEntry;
    });
  }
  return null;
};
