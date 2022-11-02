import { program } from "commander";
import { createAssetCommand } from "./command/createAssetCommand.js";
import { createManifestCommand } from "./command/createManifestCommand.js";
import { createAllCommand } from "./command/createAllCommand.js";
import { createAudioSpriteCommand } from "./command/createAudioSpriteCommand.js";
import { initConfigCommand } from "./command/initConfigCommand.js";
import { showConfigCommand } from "./command/showConfigCommand.js";

/**
 * Runs the CLI Commander program
 *
 * @returns {object} TBD
 */
export const commanderProgram = () => {
  program
    .command("init")
    .option("-v, --verbose", "Print detailed information to console", false)
    .description("Create configuration")
    .action(initConfigCommand);

  program
    .command("config")
    .option("-c, --config-file <config-file>", "Configuration file")
    .option("-v, --verbose", "Print detailed information to console", false)
    .description("Show configuration")
    .action(showConfigCommand);

  program
    .command("all")
    .option("-p, --project-dir <project-dir>", "Project directory", "")
    .option("-c, --config-file <config-file>", "Configuration file")
    .option("-v, --verbose", "Print detailed information to console", false)
    .description("Create assets and manifests")
    .action(createAllCommand);

  program
    .command("asset")
    .option("-p, --project-dir <project-dir>", "Project directory", "")
    .option("-c, --config-file <config-file>", "Configuration file")
    .option("-v, --verbose", "Print detailed information to console", false)
    .description("Create assets")
    .action(createAssetCommand);

  program
    .command("manifest")
    .option("-p, --project-dir <project-dir>", "Set project identifier", "")
    .option("-c, --config-file <config-file>", "Configuration file")
    .option("-v, --verbose", "Print detailed information to console", false)
    .description("Create manifests")
    .action(createManifestCommand);

  program
    .command("audioSprite")
    .requiredOption("-n, --name <name>", "Output name")
    .requiredOption("-s, --source-path <source-path>", "Source path")
    .requiredOption("-t, --output-path <output-path>", "Output path")
    .option("-c, --config-file <config-file>", "Configuration file")
    .option("-v, --verbose", "Print detailed information to console", false)
    .description("Create a single audio sprite")
    .action(createAudioSpriteCommand);

  return program.parse();
};
