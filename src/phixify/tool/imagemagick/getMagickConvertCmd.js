/**
 * Creates a image magick conversion command for execution.
 * @param {object} config - The configuration object reference.
 * @param {string} inputFile - TBD.
 * @param {string} outputFile - TBD.
 * @returns {string} TBD.
 */
import { parse } from "path";

export const getMagickConvertCmd = (config, inputFile, outputFile) => {
  const path = config.cmd.imageMagick.path;
  const parsedOutputFile = parse(outputFile);
  const ext = parsedOutputFile.ext.substring(1);
  const opts = config.cmd.imageMagick.opts[ext].join(" ").trim();
  return `${path} ${opts} ${inputFile} ${outputFile}`;
};
