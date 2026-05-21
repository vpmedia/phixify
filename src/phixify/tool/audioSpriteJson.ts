import type { AudioDurationResult, AudioSpriteJsonData, PhixifyConfig } from '../types.js';
import { writeJson } from './fileUtil.js';

/**
 * Creates the data file of an audio sprite.
 */
export const audioSpriteJson = (
  config: PhixifyConfig,
  outputPath: string,
  name: string,
  durationResults: AudioDurationResult[]
): void => {
  // collect audio formats
  const resources = config.asset.sound.map((ext) => {
    return `${name}.${ext}`;
  });
  resources.push(`${name}.wav`);
  // generate sprite descriptor
  const spriteData: AudioSpriteJsonData = {
    resources,
    spritemap: {},
  };
  // calculate audio timings
  let start = 0;
  durationResults.forEach((item) => {
    spriteData.spritemap[item.name] = {
      start,
      end: start + item.duration,
      duration: item.duration,
      loop: false,
    };
    start += item.roundedDuration;
  });
  // write out json data file
  writeJson(config, spriteData, `${outputPath}${name}.json`);
};
