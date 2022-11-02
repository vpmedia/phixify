import { getFileList } from "../tool/fileUtil.js";
import { imageConvert } from "../tool/imageConvert.js";

/**
 * Creates many image file assets
 *
 * @param {object} config Reference to the configuration object
 * @param {string} baseDir TBD
 * @returns {Promise} TBD
 */
export async function createImage(config, baseDir) {
  if (config.options.verbose) {
    console.log("Creating images...");
  }
  const promises = [];
  const formats = config.asset.image;
  const targetPath = `${baseDir}${config.dir.image}/`;
  const fileList = getFileList(targetPath);
  fileList
    .filter((item) => item.ext === "png")
    .forEach((item) => {
      const inputFile = `${targetPath}${item.name}.${item.ext}`;
      formats.forEach((ext) => {
        const outputFile = `${targetPath}${item.name}.${ext}`;
        const convertResult = imageConvert(config, inputFile, outputFile);
        promises.push(convertResult);
      });
    });
  return Promise.all(promises);
}
