import type { PhixifyConfig } from '../types.js';
import type { ExecResult } from '../tool/audioConcat.js';
import { getFileList } from '../tool/fileUtil.js';
import { audioConvert } from '../tool/audioConvert.js';

/**
 * Creates many sound file assets.
 */
export async function createSound(config: PhixifyConfig, baseDir: string): Promise<ExecResult[]> {
  if (config.options.verbose) {
    console.log('Creating sounds...');
  }
  const promises: Promise<ExecResult>[] = [];
  const formats = config.asset.sound;
  const targetPath = `${baseDir}${config.dir.sound}/`;
  const fileList = getFileList(targetPath);
  fileList
    .filter((item) => item.ext === 'wav')
    .forEach((item) => {
      const inputFile = `${targetPath}${item.name}.${item.ext}`;
      formats.forEach((ext) => {
        const outputFile = `${targetPath}${item.name}.${ext}`;
        const convertResult = audioConvert(config, inputFile, outputFile);
        promises.push(convertResult);
      });
    });
  return Promise.all(promises);
}
