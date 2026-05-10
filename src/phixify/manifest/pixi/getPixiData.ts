import type { PhixifyConfig, PixiAsset } from '../../types.js';
import { getFileList } from '../../tool/fileUtil.js';
import { DATA } from '../const.js';

/**
 * Creates the data entries for the manifest object.
 */
export const getPixiData = (config: PhixifyConfig, assetPath: string, targetPath: string): PixiAsset[] => {
  const dir = config.dir[DATA];
  const path = `${assetPath}${dir}/`;
  const list = getFileList(`${targetPath}${dir}`);
  const result: PixiAsset[] = [];
  list.forEach((value) => {
    const src = `${path}${value.name}.${value.ext}`;
    result.push({ alias: `${value.name}.${value.ext}`, src });
  });
  return result;
};
