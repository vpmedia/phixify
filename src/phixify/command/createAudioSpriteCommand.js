import { getConfig } from '../config/getConfig.js';
import { getFileList, isFile, normalizePath } from '../tool/fileUtil.js';
import { audioDuration } from '../tool/audioDuration.js';
import { audioConcat } from '../tool/audioConcat.js';
import { audioSpriteJson } from '../tool/audioSpriteJson.js';

/**
 * Creates a single audio sprite file.
 * @param {object} options - TBD.
 */
export const createAudioSpriteCommand = (options) => {
  console.time('Audio Sprite created');
  const config = getConfig(options);
  if (options.verbose) {
    console.log('Creating audio sprite...');
  }
  if (options.verbose) {
    console.log('Using configuration', config);
  }
  const sourcePath = normalizePath(config.options.sourcePath);
  if (!isFile(sourcePath)) {
    console.error('Source path does not exists', sourcePath);
    return;
  }
  const outputPath = normalizePath(config.options.outputPath);
  if (!isFile(outputPath)) {
    console.error('Output path does not exists', outputPath);
    return;
  }
  const name = config.options.name;
  const durationPromises = [];
  const fileList = getFileList(sourcePath);
  fileList.forEach((item) => {
    const durationResult = audioDuration(config, sourcePath, item);
    durationPromises.push(durationResult);
  });
  Promise.all(durationPromises).then((durationResults) => {
    // console.log(name, durationResults);
    const outputFile = `${outputPath}${name}.wav`;
    const concatCmdResult = audioConcat(config, durationResults, sourcePath, outputFile);
    concatCmdResult.then(() => {
      audioSpriteJson(config, outputPath, name, durationResults);
      console.log('Created sound', outputFile);
      console.log('Created data', outputFile.replace('.wav', '.json'));
      console.timeEnd('Audio Sprite created');
    });
  });
};
