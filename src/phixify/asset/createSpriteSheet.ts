import type { OutputInfo } from 'sharp';
import type { DirectoryEntry, PhixifyConfig } from '../types.js';
import type { ExecResult } from '../tool/audioConcat.js';
import { getDirectoryList, readJson, writeJson } from '../tool/fileUtil.js';
import { imageConvert } from '../tool/imageConvert.js';
import { fileCopy } from '../tool/fileCopy.js';
import { imagePack } from '../tool/imagePack.js';

interface SpriteSheetData {
  meta: { image: string; [key: string]: unknown };
  [key: string]: unknown;
}

type SpriteSheetItemResult = (OutputInfo | ExecResult)[];

/**
 * Creates many sprite sheet file assets.
 */
async function createSpriteSheetItem(
  config: PhixifyConfig,
  sourcePath: string,
  outputPath: string,
  dir: DirectoryEntry,
): Promise<SpriteSheetItemResult> {
  if (config.options.verbose) {
    console.log('Creating sprite sheet:', dir.name);
  }
  const formats = config.asset.image;
  const inputDir = `${sourcePath}${dir.name}`;
  const outputSheet = `${outputPath}${dir.name}.png`;
  const outputData = `${outputPath}${dir.name}.json`;
  return new Promise<SpriteSheetItemResult>((resolve) => {
    const packResult = imagePack(config, inputDir, outputSheet, outputData);
    packResult.then(() => {
      const promises: Promise<OutputInfo | ExecResult>[] = [];
      const sourceResolutionValue = config.asset.resolution.slice(-1)[0];
      const sourceResolutionName = `@${sourceResolutionValue}x`;
      const resolutionNames = config.asset.resolution.map((resolutionValue) => `@${resolutionValue}x`);
      const resolutions = dir.name.includes(sourceResolutionName) ? resolutionNames : [''];
      const fileName = dir.name.replace(sourceResolutionName, '');
      resolutions.forEach((res) => {
        formats.forEach((ext) => {
          // convert image
          const convertResult = imageConvert(
            config,
            `${outputPath}${fileName}${res}.png`,
            `${outputPath}${fileName}${res}.${ext}`,
          );
          promises.push(convertResult);
          // copy format json
          const copyResult = fileCopy(
            config,
            `${outputPath}${fileName}${res}.json`,
            `${outputPath}${fileName}${res}.${ext}.json`,
          );
          promises.push(copyResult);
        });
        // copy png json to alias (spriteSheet.json to spriteSheet.png.json)
        const copyResult = fileCopy(
          config,
          `${outputPath}${fileName}${res}.json`,
          `${outputPath}${fileName}${res}.png.json`,
        );
        promises.push(copyResult);
      });
      Promise.all(promises).then((result) => {
        resolutions.forEach((res) => {
          formats.forEach((ext) => {
            const formatData = readJson<SpriteSheetData>(`${outputPath}${fileName}${res}.${ext}.json`);
            formatData.meta.image = `${fileName}${res}.${ext}`;
            writeJson(config, formatData, `${outputPath}${fileName}${res}.${ext}.json`);
          });
        });
        // finally
        resolve(result);
      });
    });
  });
}

/**
 * Creates all sprite sheets from a source directory.
 */
export async function createSpriteSheet(
  config: PhixifyConfig,
  baseDir: string,
): Promise<SpriteSheetItemResult[]> {
  if (config.options.verbose) {
    console.log('Creating sprite sheets...');
  }
  const promises: Promise<SpriteSheetItemResult>[] = [];
  const sourcePath = `${baseDir}${config.dir.spriteSheetSource}/`;
  const outputPath = `${baseDir}${config.dir.spriteSheet}/`;
  const dirList = getDirectoryList(sourcePath);
  dirList.forEach((dir) => {
    promises.push(createSpriteSheetItem(config, sourcePath, outputPath, dir));
  });
  return Promise.all(promises);
}
