import { getMagickInfoCmd } from "./imagemagick/getMagickInfoCmd.js";
import { promisify } from "util";
import { exec } from "child_process";

/**
 * Gets image information
 *
 * @param {object} config Reference to the configuration object
 * @param {string} file TBD
 * @returns {Promise} TBD
 */
export async function imageInfo(config, file) {
  const execPromise = promisify(exec);
  const cmd = getMagickInfoCmd(config, file);
  const cmdResult = execPromise(cmd, { stdio: "pipe" });
  if (config.options.verbose) {
    console.log("Running command:", cmd);
  }
  if (config.options.verbose) {
    cmdResult.then((result) => {
      if (result.stderr) {
        console.warn(result.stderr, file);
      }
    });
  }
  return cmdResult.then((result) => {
    return JSON.parse(result.stdout);
  });
}
