import { getFileList } from "../tool/fileUtil.js";
import { audioConvert } from "../tool/audioConvert.js";

/**
 * Creates many sound file assets
 *
 * @param {object} config The configuration object reference
 * @param {string} baseDir TBD
 * @returns {Promise} TBD
 */
export async function createSound(config, baseDir) {
  if (config.options.verbose) {
    console.log("Creating sounds...");
  }
  const promises = [];
  const formats = config.asset.sound;
  const targetPath = `${baseDir}${config.dir.sound}/`;
  const fileList = getFileList(targetPath);
  fileList
    .filter((item) => item.ext === "wav")
    .forEach((item) => {
      const inputFile = `${targetPath}${item.name}.${item.ext}`;
      formats.forEach((ext) => {
        const outputFile = `${targetPath}${item.name}.${ext}`;
        const convertResult = audioConvert(config, inputFile, outputFile);
        promises.push(convertResult);
      });
    });
  return Promise.all(promises);
}
