import sharp from 'sharp';
import type { OutputInfo, SharpOptions } from 'sharp';
import { parse } from 'node:path';
import type { PhixifyConfig } from '../../types.js';

/**
 * Creates a sharp resize command for execution.
 */
export const getSharpResizeCmd = (
  config: PhixifyConfig,
  inputFile: string,
  outputFile: string,
  scale: number
): Promise<OutputInfo> => {
  const parsedOutputFile = parse(outputFile);
  const ext = parsedOutputFile.ext.substring(1);
  const opts = config.cmd.sharp.opts[ext] as SharpOptions;
  if (config.options.verbose) {
    console.log('Running command:', `sharp resize ${inputFile} ${outputFile} ${scale}`, opts);
  }
  return sharp(inputFile, opts)
    .metadata()
    .then(({ width }) =>
      sharp(inputFile)
        .resize(Math.ceil((width ?? 0) * scale))
        .toFile(outputFile)
    );
};
