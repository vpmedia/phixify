import type { AudioDurationResult, PhixifyConfig } from '../../types.js';

/**
 * Creates a sox audio sprite creation command for execution.
 */
export const getSoxConcatCmd = (
  config: PhixifyConfig,
  durationResults: AudioDurationResult[],
  inputDir: string,
  outputFile: string
): string => {
  const path = config.cmd.sox.path;
  let concatCmdParams = '';
  durationResults.forEach((item) => {
    const inputFile = `${inputDir}${item.name}.wav`;
    concatCmdParams += `"|sox ${inputFile} -p pad 0 ${item.padDuration}" `;
  });
  return `${path} ${concatCmdParams}${outputFile}`;
};
