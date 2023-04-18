/**
 * Creates a sharp conversion command for execution.
 * @param {object} config - The configuration object reference.
 * @param {string} inputFile - TBD.
 * @param {string} outputFile - TBD.
 * @returns {string} TBD.
 */
import sharp from "sharp";
import { parse } from "path";

export const getSharpConvertCmd = (config, inputFile, outputFile) => {
  const parsedOutputFile = parse(outputFile);
  const ext = parsedOutputFile.ext.substring(1);
  const opts = config.cmd.sharp.opts[ext];
  if (config.options.verbose) {
    console.log("Running command:", `sharp convert ${inputFile} ${outputFile}`, opts);
  }
  return sharp(inputFile, opts).toFile(outputFile);
};
