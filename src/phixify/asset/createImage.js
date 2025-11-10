import { getFileList } from "../tool/fileUtil.js";
import { imageConvert } from "../tool/imageConvert.js";
import { imageResize } from "../tool/imageResize.js";

/**
 * Creates many image file assets
 * @param {object} config The configuration object reference
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
  const sourceResolutionValue = config.asset.resolution.slice(-1)[0];
  const sourceResolutionName = `@${sourceResolutionValue}x`;
  const resolutionRegExp = new RegExp("[@].*[x]");
  fileList
    .filter((item) => item.ext === "png" && item.name.includes(sourceResolutionName))
    .forEach((item) => {
      const inputFile = `${targetPath}${item.name}.${item.ext}`;
      config.asset.resolution.slice(0, -1).forEach((resolutionValue) => {
        const resolutionName = `@${resolutionValue}x`;
        const resolutionFormats = [...formats, "png"];
        resolutionFormats.forEach((ext) => {
          const outputFile = `${targetPath}${item.name.replace(sourceResolutionName, resolutionName)}.${ext}`;
          const scale = resolutionValue / sourceResolutionValue;
          const resizeResult = imageResize(config, inputFile, outputFile, scale);
          promises.push(resizeResult);
        });
      });
    });
  fileList
    .filter((item) => item.ext === "png" && (!resolutionRegExp.test(item.name) || item.name.includes(sourceResolutionName)))
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
