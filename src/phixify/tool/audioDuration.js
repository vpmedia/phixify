import { getSoxDurationCmd } from "./sox/getSoxDurationCmd.js";
import { getFFDurationCmd } from "./ffmpeg/getFFDurationCmd.js";
import { promisify } from "util";
import { exec } from "child_process";

/**
 * Returns the duration of a sound file
 *
 * @param {object} config The configuration object reference
 * @param {string} inputDir TBD
 * @param {object} item TBD
 * @param {string} item.name TBD
 * @param {string} item.ext TBD
 * @returns {Promise} TBD
 */
export async function audioDuration(config, inputDir, item) {
  const execPromise = promisify(exec);
  const promise = new Promise((resolve) => {
    const cmd =
      config.tool.sound === "sox"
        ? getSoxDurationCmd(config, `${inputDir}${item.name}.${item.ext}`)
        : getFFDurationCmd(config, `${inputDir}${item.name}.${item.ext}`);
    const cmdResult = execPromise(cmd, { stdio: "pipe" });
    // wait for duration to be calculated
    cmdResult.then((durationValue) => {
      // calculate durations
      const duration = parseFloat(durationValue.stdout.toString());
      const roundedDuration = Math.ceil(duration + 1);
      const padDuration = roundedDuration - duration;
      resolve({ name: item.name, duration, roundedDuration, padDuration });
    });
  });
  return promise;
}
