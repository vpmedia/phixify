import type { PhaserFileEntry, PhaserManifest, PhixifyConfig } from '../../types.js';
import { getPhaserAudioSprite } from './getPhaserAudioSprite.js';
import { getPhaserData } from './getPhaserData.js';
import { getPhaserImage } from './getPhaserImage.js';
import { getPhaserSound } from './getPhaserSound.js';
import { getPhaserSpriteSheet } from './getPhaserSpriteSheet.js';
import { getPhaserSvg } from './getPhaserSvg.js';
import { getPhaserBitmapFont } from './getPhaserBitmapFont.js';
import { AUDIO_SPRITE, DATA, IMAGE, SOUND, SPRITE_SHEET, BITMAP_FONT, SVG } from '../const.js';

type PhaserGenerator = (config: PhixifyConfig, assetPath: string, targetPath: string) => PhaserFileEntry[];

/**
 * Generates a Phaser game engine asset pack manifest.
 */
export const createPhaserManifest = (
  config: PhixifyConfig,
  manifestData: PhaserManifest,
  bundleName: string,
  assetPath: string,
  targetPath: string
): PhaserManifest => {
  const manifestGenerators: { type: string; generator: PhaserGenerator }[] = [
    { type: AUDIO_SPRITE, generator: getPhaserAudioSprite },
    { type: IMAGE, generator: getPhaserImage },
    { type: SOUND, generator: getPhaserSound },
    { type: SPRITE_SHEET, generator: getPhaserSpriteSheet },
    { type: DATA, generator: getPhaserData },
    { type: SVG, generator: getPhaserSvg },
    { type: BITMAP_FONT, generator: getPhaserBitmapFont },
  ];
  let files: PhaserFileEntry[] = [];
  manifestGenerators.forEach((item) => {
    const data = item.generator(config, assetPath, targetPath);
    files = [...files, ...data];
  });
  manifestData[bundleName] = { files };
  return manifestData;
};
