import { parse } from 'node:path';
import type { PhixifyConfig } from '../../types.js';

/**
 * Creates a ffmpeg audio conversion command for execution.
 */
export const getFFConvertCmd = (config: PhixifyConfig, inputFile: string, outputFile: string): string => {
  const path = config.cmd.ffmpeg.path;
  const parsedOutputFile = parse(outputFile);
  const ext = parsedOutputFile.ext.substring(1);
  const opts = config.cmd.ffmpeg.opts[ext].join(' ').trim();
  return `${path} -y -i ${inputFile} ${opts} ${outputFile}`;
};
