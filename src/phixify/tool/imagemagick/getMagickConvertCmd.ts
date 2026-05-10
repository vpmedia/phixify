import { parse } from 'node:path';
import type { PhixifyConfig } from '../../types.js';

/**
 * Creates a image magick conversion command for execution.
 */
export const getMagickConvertCmd = (config: PhixifyConfig, inputFile: string, outputFile: string): string => {
  const path = config.cmd.imageMagick.path;
  const parsedOutputFile = parse(outputFile);
  const ext = parsedOutputFile.ext.substring(1);
  const opts = config.cmd.imageMagick.opts[ext].join(' ').trim();
  return `${path} ${opts} ${inputFile} ${outputFile}`;
};
