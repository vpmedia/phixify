/**
 * Creates a sharp resize command for execution.
 * @param {object} config - The configuration object reference.
 * @param {string} inputFile - TBD.
 * @param {string} outputFile - TBD.
 * @param {number} scale - TBD.
 * @returns {string} TBD.
 */
import sharp from 'sharp';
import { parse } from 'path';

export const getSharpResizeCmd = (config, inputFile, outputFile, scale) => {
  const parsedOutputFile = parse(outputFile);
  const ext = parsedOutputFile.ext.substring(1);
  const opts = config.cmd.sharp.opts[ext];
  if (config.options.verbose) {
    console.log('Running command:', `sharp resize ${inputFile} ${outputFile} ${scale}`, opts);
  }
  return sharp(inputFile, opts)
    .metadata()
    .then(({ width }) =>
      sharp(inputFile)
        .resize(Math.ceil(width * scale))
        .toFile(outputFile)
    );
};
