import { parse } from "path";

/**
 * Creates a ffmpeg audio conversion command for execution
 *
 * @param {object} config The configuration object reference
 * @param {string} inputFile TBD
 * @param {string} outputFile TBD
 * @returns {string} TBD
 */
export const getFFConvertCmd = (config, inputFile, outputFile) => {
  const path = config.cmd.ffmpeg.path;
  const parsedOutputFile = parse(outputFile);
  const ext = parsedOutputFile.ext.substring(1);
  const opts = config.cmd.ffmpeg.opts[ext].join(" ").trim();
  return `${path} -y -i ${inputFile} ${opts} ${outputFile}`;
};
