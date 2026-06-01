import path from 'node:path';
import type { PhixifyConfig } from '../../types.js';

/**
 * Creates a sox audio conversion command for execution.
 */
export const getSoxConvertCmd = (config: PhixifyConfig, inputFile: string, outputFile: string): string => {
  const cmdPath = config.cmd.sox.path;
  const parsedOutputFile = path.parse(outputFile);
  const ext = parsedOutputFile.ext.substring(1);
  const opts = config.cmd.sox.opts[ext].join(' ').trim();
  return `${cmdPath} ${inputFile} ${opts} ${outputFile}`;
};
