import type { PhixifyConfig } from '../../types.js';

/**
 * Creates a image magick resize command for execution.
 */
export const getMagickResizeCmd = (
  config: PhixifyConfig,
  inputFile: string,
  outputFile: string,
  scale: number
): string => {
  const path = config.cmd.imageMagick.path;
  const opts = `-resize ${scale * 100}%`;
  return `${path} ${opts} ${inputFile} ${outputFile}`;
};
