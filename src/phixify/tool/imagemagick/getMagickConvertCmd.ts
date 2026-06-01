import path from 'node:path';
import type { PhixifyConfig } from '../../types.js';

/**
 * Creates a image magick conversion command for execution.
 */
export const getMagickConvertCmd = (config: PhixifyConfig, inputFile: string, outputFile: string): string => {
  const cmdPath = config.cmd.imageMagick.path;
  const parsedOutputFile = path.parse(outputFile);
  const ext = parsedOutputFile.ext.substring(1);
  const opts = config.cmd.imageMagick.opts[ext].join(' ').trim();
  return `${cmdPath} ${opts} ${inputFile} ${outputFile}`;
};
