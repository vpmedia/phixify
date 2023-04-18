import { promisify } from "util";
import { exec } from "child_process";

/**
 * Copies a file.
 * @param {object} config - The configuration object reference.
 * @param {string} inputFile - TBD.
 * @param {string} outputFile - TBD.
 * @returns {Promise} TBD.
 */
export async function fileCopy(config, inputFile, outputFile) {
  const execPromise = promisify(exec);
  const cmd = `cp ${inputFile} ${outputFile}`;
  const cmdResult = execPromise(cmd, { stdio: "pipe" });
  if (config.options.verbose) {
    console.log("Running command:", cmd);
  }
  return cmdResult;
}
