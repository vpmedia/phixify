import type { PhixifyConfig, PixiAsset } from '../../types.js';
import { getFileList } from '../../tool/fileUtil.js';
import { SVG } from '../const.js';

/**
 * Creates the svg entries for the manifest object.
 */
export const getPixiSvg = (config: PhixifyConfig, assetPath: string, targetPath: string): PixiAsset[] => {
  const dir = config.dir[SVG];
  const path = `${assetPath}${dir}/`;
  const list = getFileList(`${targetPath}${dir}`);
  const result: PixiAsset[] = [];
  list.forEach((value) => {
    const src = `${path}${value.name}.${value.ext}`;
    result.push({ alias: `${value.name}.${value.ext}`, src });
  });
  return result;
};
