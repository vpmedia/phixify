import { readFileSync, readdirSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import type { DirectoryEntry, FileEntry, PhixifyConfig } from '../types.js';

/**
 * Check for a path if exists in the filesystem.
 */
export const isFile = (filePath: string): boolean => {
  return existsSync(filePath);
};

/**
 * Normalizes a path.
 */
export const normalizePath = (filePath: string): string => {
  const normalizedPath = filePath.trim().replace('//', '/');
  return normalizedPath.endsWith('/') ? normalizedPath : `${normalizedPath}/`;
};

/**
 * Reads and parses a JSON file.
 */
export const readJson = <T = Record<string, unknown>>(filePath: string | undefined): T => {
  if (!filePath || !existsSync(filePath)) {
    return {} as T;
  }
  return JSON.parse(readFileSync(filePath).toString()) as T;
};

/**
 * Writes out a JSON file.
 */
export const writeJson = (config: PhixifyConfig, content: unknown, filePath: string): void => {
  const parsedPath = path.parse(filePath);
  if (!existsSync(parsedPath.dir)) {
    mkdirSync(parsedPath.dir);
  }
  if (config.options.verbose) {
    console.log('Writing JSON:', filePath);
  }
  writeFileSync(filePath, JSON.stringify(content, null, 2));
};

/**
 * Lists the files of a directory.
 */
export const getFileList = (filePath: string): FileEntry[] => {
  const result: FileEntry[] = [];
  if (!existsSync(filePath)) {
    return result;
  }
  readdirSync(filePath, { withFileTypes: true }).forEach((item) => {
    if (!item.isDirectory()) {
      const parsedPath = path.parse(item.name);
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
export const getDirectoryList = (filePath: string): DirectoryEntry[] => {
  const result: DirectoryEntry[] = [];
  if (!existsSync(filePath)) {
    return result;
  }
  readdirSync(filePath, { withFileTypes: true }).forEach((item) => {
    if (item.isDirectory()) {
      const files = getFileList(`${filePath}/${item.name}`);
      result.push({ name: item.name, files });
    }
  });
  return result;
};
