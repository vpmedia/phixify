import { readFileSync, readdirSync, existsSync, mkdirSync, writeFileSync } from 'fs';
import { parse } from 'path';

/**
 * Check for a path if exists in the filesystem.
 * @param {string} path - TBD.
 * @returns {boolean} TBD.
 */
export const isFile = (path) => {
  return existsSync(path);
};

/**
 * Normalizes a path.
 * @param {string} path - TBD.
 * @returns {string} TBD.
 */
export const normalizePath = (path) => {
  const normalizedPath = path.trim().replace('//', '/');
  return normalizedPath.endsWith('/') ? normalizedPath : `${normalizedPath}/`;
};

/**
 * Reads and parses a JSON file.
 * @param {string} path - The path to the JSON file.
 * @returns {object} The parsed JSON data.
 */
export const readJson = (path) => {
  if (!existsSync(path)) {
    return {};
  }
  return JSON.parse(readFileSync(path).toString());
};

/**
 * Writes out a JSON file.
 * @param {object} config - The configuration object reference.
 * @param {object} content - TBD.
 * @param {string} path - TBD.
 */
export const writeJson = (config, content, path) => {
  const parsedPath = parse(path);
  if (!existsSync(parsedPath.dir)) {
    mkdirSync(parsedPath.dir);
  }
  if (config.options.verbose) {
    console.log('Writing JSON:', path);
  }
  writeFileSync(path, JSON.stringify(content, null, 2));
};

/**
 * Lists the files of a directory.
 * @param {string} path - TBD.
 * @returns {{name: string, ext: string}[]} TBD.
 */
export const getFileList = (path) => {
  const result = [];
  if (!existsSync(path)) {
    return result;
  }
  readdirSync(path, { withFileTypes: true }).forEach((item) => {
    if (!item.isDirectory()) {
      const parsedPath = parse(item.name);
      const name = parsedPath.name;
      const ext = parsedPath.ext.substring(1);
      result.push({ name, ext });
    }
  });
  return result;
};

/**
 * Lists the directories and files of a directory.
 * @param {string} path - TBD.
 * @returns {object[]} TBD.
 */
export const getDirectoryList = (path) => {
  const result = [];
  if (!existsSync(path)) {
    return result;
  }
  readdirSync(path, { withFileTypes: true }).forEach((item) => {
    if (item.isDirectory()) {
      const files = getFileList(`${path}/${item.name}`);
      result.push({ name: item.name, files });
    }
  });
  return result;
};
