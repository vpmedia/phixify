import { parse } from 'node:path';

/**
 * Creates a sox audio conversion command for execution.
 * @param {object} config - The configuration object reference.
 * @param {string} inputFile - TBD.
 * @param {string} outputFile - TBD.
 * @returns {string} TBD.
 */
export const getSoxConvertCmd = (config, inputFile, outputFile) => {
  const path = config.cmd.sox.path;
  const parsedOutputFile = parse(outputFile);
  const ext = parsedOutputFile.ext.substring(1);
  const opts = config.cmd.sox.opts[ext].join(' ').trim();
  return `${path} ${inputFile} ${opts} ${outputFile}`;
};
