import type { PhaserFileAudioSprite, PhixifyConfig } from '../../types.js';
import { AUDIO_SPRITE } from '../const.js';
import { getFileList } from '../../tool/fileUtil.js';

/**
 * Creates the audio sprite entries for the manifest object.
 */
export const getPhaserAudioSprite = (
  config: PhixifyConfig,
  assetPath: string,
  targetPath: string,
): PhaserFileAudioSprite[] => {
  const dir = config.dir[AUDIO_SPRITE];
  const path = `${assetPath}${dir}/`;
  const list = getFileList(`${targetPath}${dir}`);
  const formats = config.manifest.sound;
  const sortFunc = (a: string, b: string): number => {
    return formats.indexOf(a) - formats.indexOf(b);
  };
  const result: PhaserFileAudioSprite[] = [];
  const map: Record<string, string[]> = {};
  list.forEach((value) => {
    map[value.name] = map[value.name] || [];
    map[value.name].push(value.ext);
  });
  Object.entries(map).forEach(([key, value]) => {
    const audioURL = value
      .filter((ext) => ext !== 'json')
      .sort(sortFunc)
      .map((ext) => `${path}${key}.${ext}`);
    const jsonURL = `${path}${key}.json`;
    result.push({ type: 'audioSprite', key, audioURL, jsonURL });
  });
  return result;
};
