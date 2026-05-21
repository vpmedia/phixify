import type { PhaserFileGeneric, PhixifyConfig } from '../../types.js';
import { SVG } from '../const.js';
import { getFileList } from '../../tool/fileUtil.js';

const getTypeByExt = (ext: string): string => {
  if (ext === 'svg') {
    return 'svg';
  }
  return ext;
};

/**
 * Creates the svg entries for the manifest object.
 */
export const getPhaserSvg = (config: PhixifyConfig, assetPath: string, targetPath: string): PhaserFileGeneric[] => {
  const dir = config.dir[SVG];
  const path = `${assetPath}${dir}/`;
  const list = getFileList(`${targetPath}${dir}`);
  const result: PhaserFileGeneric[] = [];
  list.forEach((value) => {
    const url = `${path}${value.name}.${value.ext}`;
    result.push({ type: getTypeByExt(value.ext), key: `${value.name}.${value.ext}`, url });
  });
  return result;
};
