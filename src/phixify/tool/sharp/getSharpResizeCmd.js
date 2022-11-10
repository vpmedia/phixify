/**
 * Creates a sharp resize command for execution
 *
 * @param {object} config The configuration object reference
 * @param {string} inputFile TBD
 * @param {string} outputFile TBD
 * @param {number} scale TBD
 * @returns {string} TBD
 */
import sharp from "sharp";

export const getSharpResizeCmd = (config, inputFile, outputFile, scale) => {
  if (config.options.verbose) {
    console.log("Running command:", `sharp resize ${inputFile} ${outputFile}`);
  }
  return sharp(inputFile)
    .metadata()
    .then(({ width, height }) =>
      sharp(inputFile)
        .resize(width * scale, height * scale)
        .toFile(outputFile)
    );
};
