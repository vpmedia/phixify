/**
 * Creates a image magick identify command for execution.
 * @param {object} config - The configuration object reference.
 * @param {string} file - TBD.
 * @returns {string} TBD.
 */
import sharp from "sharp";

export const getSharpInfoCmd = (config, file) => {
  if (config.options.verbose) {
    console.log("Running command:", `sharp metadata ${file}`);
  }
  return sharp(file).metadata();
};
