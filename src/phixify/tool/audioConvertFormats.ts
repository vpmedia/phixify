import type { PhixifyConfig } from '../types.js';
import type { ExecResult } from './audioConcat.js';
import { audioConvert } from './audioConvert.js';

/**
 * Converts an audio file from one format to many.
 */
export async function audioConvertFormats(
  config: PhixifyConfig,
  formats: string[],
  outputPath: string,
  fileName: string,
): Promise<ExecResult[]> {
  const convertPromises: Promise<ExecResult>[] = [];
  formats.forEach((ext) => {
    const convertResult = audioConvert(config, `${outputPath}${fileName}.wav`, `${outputPath}${fileName}.${ext}`);
    convertPromises.push(convertResult);
  });
  return Promise.all(convertPromises);
}
