/**
 * Shared types for the phixify CLI.
 */

export interface PhixifyCliOptions {
  configFile?: string;
  projectDir?: string;
  verbose?: boolean;
  name?: string;
  sourcePath?: string;
  outputPath?: string;
}

export interface PhixifyFlagConfig {
  multiProject: boolean;
  multiBundle: boolean;
  skipManifestMeta: boolean;
}

export interface PhixifyEngineConfig {
  pixi: boolean;
  phaser: boolean;
}

export interface PhixifyOutputConfig {
  pixi: string;
  phaser: string;
  phixify: string;
}

export interface PhixifyDirConfig {
  audioSprite: string;
  audioSpriteSource: string;
  bitmapFont: string;
  data: string;
  image: string;
  sound: string;
  spriteSheet: string;
  spriteSheetSource: string;
  svg: string;
}

export interface PhixifyAssetConfig {
  image: string[];
  sound: string[];
  resolution: number[];
}

export interface PhixifyManifestConfig {
  image: string[];
  sound: string[];
}

export interface PhixifyToolConfig {
  image: string;
  sound: string;
  spriteSheet: string;
}

export interface SharpFormatOpts {
  quality?: number;
  [key: string]: unknown;
}

export interface PhixifyCmdConfig {
  texturePacker: {
    path: string;
    opts: {
      png: string[];
      [key: string]: string[];
    };
  };
  imageMagick: {
    path: string;
    opts: Record<string, string[]>;
  };
  sharp: {
    opts: Record<string, SharpFormatOpts>;
  };
  sox: {
    path: string;
    opts: Record<string, string[]>;
  };
  ffmpeg: {
    path: string;
    opts: Record<string, string[]>;
  };
  ffprobe: {
    path: string;
  };
}

export interface PhixifyMeta {
  name: string;
  url: string;
  version: string;
  copyright: string;
  timestamp: string;
}

export interface PhixifyBaseConfig {
  basePath: string;
  assetPath: string;
  flag: PhixifyFlagConfig;
  engine: PhixifyEngineConfig;
  output: PhixifyOutputConfig;
  dir: PhixifyDirConfig;
  asset: PhixifyAssetConfig;
  manifest: PhixifyManifestConfig;
  tool: PhixifyToolConfig;
  cmd: PhixifyCmdConfig;
  phixify: PhixifyMeta;
}

export interface PhixifyConfig extends PhixifyBaseConfig {
  options: PhixifyCliOptions;
}

export interface FileEntry {
  name: string;
  ext: string;
}

export interface DirectoryEntry {
  name: string;
  files: FileEntry[];
}

export interface AudioDurationResult {
  name: string;
  duration: number;
  roundedDuration: number;
  padDuration: number;
}

export interface AudioSpriteJsonData {
  resources: string[];
  spritemap: Record<
    string,
    {
      start: number;
      end: number;
      duration: number;
      loop: boolean;
    }
  >;
}

export interface ManifestMeta {
  generated: string;
  app: string;
  url: string;
  version: string;
  copyright: string;
  phaserVersion?: string;
  pixiVersion?: string;
  phixifyVersion?: string;
}

/* Phaser manifest types */
export interface PhaserFileAudioSprite {
  type: 'audioSprite';
  key: string;
  audioURL: string[];
  jsonURL: string;
}
export interface PhaserFileBitmapFont {
  type: 'bitmapFont';
  key: string;
  fontDataURL: string;
  textureURL: string;
}
export interface PhaserFileGeneric {
  type: string;
  key: string;
  url: string;
}
export interface PhaserFileSound {
  type: 'audio';
  key: string;
  url: string[];
}
export interface PhaserFileAtlas {
  type: 'atlas';
  key: string;
  textureURL: string;
  atlasURL: string;
}

export type PhaserFileEntry =
  | PhaserFileAudioSprite
  | PhaserFileBitmapFont
  | PhaserFileGeneric
  | PhaserFileSound
  | PhaserFileAtlas;

export interface PhaserManifest {
  init: { files: PhaserFileEntry[] };
  meta?: ManifestMeta;
  [bundleName: string]: { files: PhaserFileEntry[] } | ManifestMeta | undefined;
}

/* Pixi manifest types */
export interface PixiAsset {
  alias: string;
  src: string;
}

export interface PixiBundle {
  name: string;
  assets: PixiAsset[];
}

export interface PixiManifest {
  bundles: PixiBundle[];
  meta?: ManifestMeta;
}

/* Phixify manifest types */
export interface PhixifyFileInfoEntry {
  size: number;
  modified: number;
  info?: Record<string, unknown>;
}

export type PhixifyFileExtMap = Record<string, PhixifyFileInfoEntry>;
export type PhixifyManifestBundleData = Record<string, Record<string, PhixifyFileExtMap>>;

export interface PhixifyManifest {
  bundles: Record<string, PhixifyManifestBundleData>;
  meta?: ManifestMeta;
}

export interface PhixifyManifestResult {
  bundleName: string;
  manifestData: PhixifyManifestBundleData;
}
