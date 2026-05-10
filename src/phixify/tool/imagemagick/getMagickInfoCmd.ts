import type { PhixifyConfig } from '../../types.js';

/**
 * Creates a image magick identify command for execution.
 */
export const getMagickInfoCmd = (config: PhixifyConfig, file: string): string => {
  const path = config.cmd.imageMagick.path;
  const infoFormat =
    '{"filesize": "%[size]", "format": "%m", "height": %h, "width": %w, "compression_type": "%C", "compression": %Q}';
  const opts = `identify -precision 0 -format '${infoFormat}'`;
  return `${path} ${opts} ${file}`;
};
