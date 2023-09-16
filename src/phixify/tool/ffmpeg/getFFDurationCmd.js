/**
 * Creates a ffmpeg audio duration check command for execution.
 * @param {object} config - The configuration object reference.
 * @param {string} file - TBD.
 * @returns {string} TBD.
 */
export const getFFDurationCmd = (config, file) => {
  const path = config.cmd.ffprobe.path;
  const opts = '-v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1';
  return `${path} ${opts} ${file}`;
};
