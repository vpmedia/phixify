/**
 * Creates a image magick resize command for execution.
 * @param {object} config - The configuration object reference.
 * @param {string} inputFile - TBD.
 * @param {string} outputFile - TBD.
 * @param {number} scale - TBD.
 * @returns {string} TBD.
 */

export const getMagickResizeCmd = (config, inputFile, outputFile, scale) => {
  const path = config.cmd.imageMagick.path;
  const opts = `-resize ${scale * 100}%`;
  return `${path} ${opts} ${inputFile} ${outputFile}`;
};
