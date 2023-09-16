import { audioConvert } from './audioConvert.js';

/**
 * Converts an audio file from one format to many.
 * @param {object} config - The configuration object reference.
 * @param {string[]} formats - TBD.
 * @param {string} outputPath - TBD.
 * @param {string} fileName - TBD.
 * @returns {Promise} TBD.
 */
export async function audioConvertFormats(config, formats, outputPath, fileName) {
  const convertPromises = [];
  formats.forEach((ext) => {
    const convertResult = audioConvert(config, `${outputPath}${fileName}.wav`, `${outputPath}${fileName}.${ext}`);
    convertPromises.push(convertResult);
  });
  return Promise.all(convertPromises);
}
