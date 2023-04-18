/**
 * Creates a image magick identify command for execution.
 * @param {object} config - The configuration object reference.
 * @param {string} file - TBD.
 * @returns {string} TBD.
 */

export const getMagickInfoCmd = (config, file) => {
  const path = config.cmd.imageMagick.path;
  const infoFormat =
    '{"filesize": "%[size]", "format": "%m", "height": %h, "width": %w, "compression_type": "%C", "compression": %Q}';
  const opts = `identify -precision 0 -format '${infoFormat}'`;
  return `${path} ${opts} ${file}`;
};
