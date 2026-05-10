import type { DirectoryEntry, PhixifyConfig } from '../types.js';
import type { ExecResult } from '../tool/audioConcat.js';
import { getDirectoryList } from '../tool/fileUtil.js';
import { audioDuration } from '../tool/audioDuration.js';
import { audioConcat } from '../tool/audioConcat.js';
import { audioConvertFormats } from '../tool/audioConvertFormats.js';
import { audioSpriteJson } from '../tool/audioSpriteJson.js';

/**
 * Creates many audio sprite file assets.
 */
async function createAudioSpriteItem(
  config: PhixifyConfig,
  sourcePath: string,
  outputPath: string,
  dir: DirectoryEntry,
): Promise<ExecResult[]> {
  if (config.options.verbose) {
    console.log('Creating audio sprite:', dir.name);
  }
  const durationPromises: ReturnType<typeof audioDuration>[] = [];
  const inputDir = `${sourcePath}${dir.name}/`;
  const outputFile = `${outputPath}${dir.name}.wav`;
  dir.files.forEach((item) => {
    const durationResult = audioDuration(config, inputDir, item);
    durationPromises.push(durationResult);
  });
  return new Promise<ExecResult[]>((resolve) => {
    Promise.all(durationPromises).then((durationResults) => {
      const concatCmdResult = audioConcat(config, durationResults, inputDir, outputFile);
      audioSpriteJson(config, outputPath, dir.name, durationResults);
      concatCmdResult.then(() => {
        const convertAudioFormatsResult = audioConvertFormats(config, config.asset.sound, outputPath, dir.name);
        convertAudioFormatsResult.then((result) => {
          resolve(result);
        });
      });
    });
  });
}

/**
 * Creates all audio sprites from a source directory.
 */
export async function createAudioSprite(config: PhixifyConfig, baseDir: string): Promise<ExecResult[][]> {
  if (config.options.verbose) {
    console.log('Creating audio sprites...');
  }
  const promises: Promise<ExecResult[]>[] = [];
  const sourcePath = `${baseDir}${config.dir.audioSpriteSource}/`;
  const outputPath = `${baseDir}${config.dir.audioSprite}/`;
  const dirList = getDirectoryList(sourcePath);
  dirList.forEach((dir) => {
    promises.push(createAudioSpriteItem(config, sourcePath, outputPath, dir));
  });
  return Promise.all(promises);
}
