import { app } from 'electron'
import path from 'path'

/**
 * Attempts to get the directory of the logging directory.
 * @returns {string} Returns the directory of the logging directory or null if it can't be found.
 */
const getLoggingDir = () => {
  return path.join(app.getPath('userData'), 'logs')
}

export default getLoggingDir
