import sharp from 'sharp';
import type { OutputInfo, SharpOptions } from 'sharp';
import path from 'node:path';
import type { PhixifyConfig } from '../../types.js';

/**
 * Creates a sharp conversion command for execution.
 */
export const getSharpConvertCmd = (
  config: PhixifyConfig,
  inputFile: string,
  outputFile: string
): Promise<OutputInfo> => {
  const parsedOutputFile = path.parse(outputFile);
  const ext = parsedOutputFile.ext.substring(1);
  const opts = config.cmd.sharp.opts[ext] as SharpOptions;
  if (config.options.verbose) {
    console.log('Running command:', `sharp convert ${inputFile} ${outputFile}`, opts);
  }
  return sharp(inputFile, opts).toFile(outputFile);
};
