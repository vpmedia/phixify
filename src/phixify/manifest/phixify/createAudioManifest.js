import { getConfig } from '../../config/getConfig.js';
import { normalizePath, readJson, writeJson } from '../../tool/fileUtil.js';

/**
 * Create audio manifest containing sound durations.
 * @param {object} options - TBD.
 * @param {string} options.configFile - TBD.
 * @param {string} options.projectDir - TBD.
 * @param {boolean} options.verbose - TBD.
 * @param {string} bundleName - TBD.
 * @param {object} manifestData - TBD.
 */
export const createAudioManifest = (options, bundleName, manifestData) => {
  // working dir
  const config = getConfig(options);
  const targetPath = normalizePath(`${config.basePath}${options.projectDir}`);
  const bundleDir = config.flag.multiBundle ? `${bundleName}/` : '';
  // output template
  const soundData = {
    sound: {},
    audioSprite: {},
  };
  // collect sound durations
  const soundKeys = Object.keys(manifestData.sound);
  soundKeys.forEach((key) => {
    soundData.sound[key] = manifestData.sound[key].wav.info.length_seconds;
  });
  // collect audio sprite durations
  const audioSpriteKeys = Object.keys(manifestData.audioSprite);
  audioSpriteKeys.forEach((key) => {
    soundData.audioSprite[key] = {};
    const spriteData = readJson(`${targetPath}${bundleDir}${config.dir.audioSprite}/${key}.json`);
    const spriteKeys = Object.keys(spriteData.spritemap);
    spriteKeys.forEach((spriteKey) => {
      soundData.audioSprite[key][spriteKey] = spriteData.spritemap[spriteKey].duration;
    });
  });
  // write out sound.json
  writeJson(config, soundData, `${targetPath}${bundleDir}${config.dir.data}/sound.json`);
};
