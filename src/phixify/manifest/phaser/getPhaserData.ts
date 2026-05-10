import type { PhaserFileGeneric, PhixifyConfig } from '../../types.js';
import { DATA } from '../const.js';
import { getFileList } from '../../tool/fileUtil.js';

const getTypeByExt = (ext: string): string => {
  if (ext === 'txt') {
    return 'text';
  }
  return ext;
};

/**
 * Creates the data entries for the manifest object.
 */
export const getPhaserData = (
  config: PhixifyConfig,
  assetPath: string,
  targetPath: string,
): PhaserFileGeneric[] => {
  const dir = config.dir[DATA];
  const path = `${assetPath}${dir}/`;
  const list = getFileList(`${targetPath}${dir}`);
  const result: PhaserFileGeneric[] = [];
  list.forEach((value) => {
    const url = `${path}${value.name}.${value.ext}`;
    result.push({ type: getTypeByExt(value.ext), key: `${value.name}.${value.ext}`, url });
  });
  return result;
};
