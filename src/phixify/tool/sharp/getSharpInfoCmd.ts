import sharp from 'sharp';
import type { Metadata } from 'sharp';
import type { PhixifyConfig } from '../../types.js';

/**
 * Returns sharp metadata for a file.
 */
export const getSharpInfoCmd = (config: PhixifyConfig, file: string): Promise<Metadata> => {
  if (config.options.verbose) {
    console.log('Running command:', `sharp metadata ${file}`);
  }
  return sharp(file).metadata();
};
