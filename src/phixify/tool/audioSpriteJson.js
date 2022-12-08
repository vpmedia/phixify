import { writeJson } from "./fileUtil.js";

/**
 * Creates the data file of an audio sprite
 *
 * @param {object} config TBD
 * @param {string} outputPath TBD
 * @param {string} name TBD
 * @param {object[]} durationResults TBD
 * @param {string} durationResults[].name TBD
 * @param {number} durationResults[].duration TBD
 * @param {number} durationResults[].roundedDuration TBD
 * @param {number} durationResults[].padDuration TBD
 */
export const audioSpriteJson = (config, outputPath, name, durationResults) => {
  // collect audio formats
  const resources = config.asset.sound.map((ext) => {
    return `${name}.${ext}`;
  });
  resources.push(`${name}.wav`);
  // generate sprite descriptor
  const spriteData = {
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
