import { getDirectoryList } from "../tool/fileUtil.js";
import { audioDuration } from "../tool/audioDuration.js";
import { audioConcat } from "../tool/audioConcat.js";
import { audioConvertFormats } from "../tool/audioConvertFormats.js";
import { audioSpriteJson } from "../tool/audioSpriteJson.js";

/**
 * Creates many audio sprite file assets
 * @param {object} config The configuration object reference
 * @param {string} sourcePath TBD
 * @param {string} outputPath TBD
 * @param {object} dir TBD
 * @param {string} dir.name TBD
 * @param {object[]} dir.files TBD
 * @returns {Promise} TBD
 */
async function createAudioSpriteItem(config, sourcePath, outputPath, dir) {
  if (config.options.verbose) {
    console.log("Creating audio sprite:", dir.name);
  }
  const durationPromises = [];
  const inputDir = `${sourcePath}${dir.name}/`;
  const outputFile = `${outputPath}${dir.name}.wav`;
  dir.files.forEach((item) => {
    const durationResult = audioDuration(config, inputDir, item);
    durationPromises.push(durationResult);
  });
  return new Promise((resolve) => {
    Promise.all(durationPromises).then((durationResults) => {
      const concatCmdResult = audioConcat(config, durationResults, inputDir, outputFile);
      audioSpriteJson(config, outputPath, dir.name, durationResults);
      concatCmdResult.then(() => {
        const convertAudioFormatsResult = audioConvertFormats(
          config,
          config.asset.sound,
          outputPath,
          dir.name
        );
        convertAudioFormatsResult.then((result) => {
          resolve(result);
        });
      });
    });
  });
}

/**
 * Creates all audio sprites from a source directory
 * @param {object} config The configuration object reference
 * @param {string} baseDir TBD
 * @returns {Promise} TBD
 */
export async function createAudioSprite(config, baseDir) {
  if (config.options.verbose) {
    console.log("Creating audio sprites...");
  }
  const promises = [];
  const sourcePath = `${baseDir}${config.dir.audioSpriteSource}/`;
  const outputPath = `${baseDir}${config.dir.audioSprite}/`;
  const dirList = getDirectoryList(sourcePath);
  dirList.forEach((dir) => {
    promises.push(createAudioSpriteItem(config, sourcePath, outputPath, dir));
  });
  return Promise.all(promises);
}
