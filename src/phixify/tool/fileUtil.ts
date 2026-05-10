import { readFileSync, readdirSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { parse } from 'node:path';
import type { DirectoryEntry, FileEntry, PhixifyConfig } from '../types.js';

/**
 * Check for a path if exists in the filesystem.
 */
export const isFile = (path: string): boolean => {
  return existsSync(path);
};

/**
 * Normalizes a path.
 */
export const normalizePath = (path: string): string => {
  const normalizedPath = path.trim().replace('//', '/');
  return normalizedPath.endsWith('/') ? normalizedPath : `${normalizedPath}/`;
};

/**
 * Reads and parses a JSON file.
 */
export const readJson = <T = Record<string, unknown>>(path: string | undefined): T => {
  if (!path || !existsSync(path)) {
    return {} as T;
  }
  return JSON.parse(readFileSync(path).toString()) as T;
};

/**
 * Writes out a JSON file.
 */
export const writeJson = (config: PhixifyConfig, content: unknown, path: string): void => {
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
 */
export const getFileList = (path: string): FileEntry[] => {
  const result: FileEntry[] = [];
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
 */
export const getDirectoryList = (path: string): DirectoryEntry[] => {
  const result: DirectoryEntry[] = [];
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
