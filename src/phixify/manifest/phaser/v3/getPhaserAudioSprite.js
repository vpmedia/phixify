/**
 * Creates the audio sprite entries for the manifest object
 *
 * @param {object} config Reference to the configuration object
 * @param {string} assetPath TBD
 * @param {string} targetPath TBD
 * @returns {object} TBD
 */
import { AUDIO_SPRITE } from "../../core/const.js";
import { getFileList } from "../../../tool/fileUtil.js";

export const getPhaserAudioSprite = (config, assetPath, targetPath) => {
  const dir = config.dir[AUDIO_SPRITE];
  const path = `${assetPath}${dir}/`;
  const list = getFileList(`${targetPath}${dir}`);
  const formats = config.manifest.sound;
  const sortFunc = (a, b) => {
    return formats.indexOf(a) - formats.indexOf(b);
  };
  const result = [];
  const map = {};
  list.forEach((value) => {
    map[value.name] = map[value.name] || [];
    map[value.name].push(value.ext);
  });
  Object.entries(map).forEach(([key, value]) => {
    const audioURL = value
      .filter((ext) => ext !== "json")
      .sort(sortFunc)
      .map((ext) => `${path}${key}.${ext}`);
    const jsonURL = `${path}${key}.json`;
    result.push({ type: "audioSprite", key, audioURL, jsonURL });
  });
  return result;
};
