import { LoggingObject, LogProcess, LogTypes } from '@src/types/logging'
import { app } from 'electron'
import path from 'path'
import fs from 'fs/promises'
import { getLoggingDir } from '@src/main/services/file-system'

let logFilePath: string | null = null

/**
 * Initializes the logger by creating a new timestamped log file. *
 * @returns {string} The full path to the created log file.
 */
const initializeLogger = async (): Promise<string | null> => {
  try {
    if (logFilePath) {
      return logFilePath
    }

    const appName = app.getName()
    const logDirectory = getLoggingDir()

    // Ensure the log directory exists
    await fs.mkdir(logDirectory, { recursive: true })

    const now = new Date()
    const timestamp = now
      .toISOString()
      .replace(/:/g, '-')
      .replace(/\./g, '_')
      .replace('T', '_')
      .slice(0, 19)

    const filename = `${appName}_${timestamp}.log`
    logFilePath = path.join(logDirectory, filename)

    // Initial write to create the file and confirm its path
    const logMessage: string = `[${new Date().toISOString()}] Log session started.\n`

    await fs.appendFile(logFilePath!, logMessage, 'utf8')
    return logFilePath
  } catch (error) {
    console.error('[ERROR IN LOGGING INIT]', error)
    return Promise.resolve(null)
  }
}

/**
 * Creates a log entry. Automatically handles file creation if needed.
 * New log files are created everytime Neo is opened.
 * @param {LoggingObject} loggingObject Logging Object. Can contain error or message depending on the useage
 * @returns {boolean} Returns true if log is written successfully, false otherwise.
 */
const log = async (loggingObject: LoggingObject): Promise<boolean> => {
  try {
    // Create a log file if needed. This should be handled during program start up though
    if (logFilePath === null) {
      await initializeLogger()
    }

    // Log time
    const logTime: string = `[${new Date().toISOString()}]`

    // Get the log level and process
    const logLevel: string = `[${loggingObject.level}]`
    const logProcess: string = `[${loggingObject.process}]`

    // Get the log message/error
    let msg: string = 'An Unknown Error has occured'
    if (loggingObject.level == 'ERROR') {
      msg = loggingObject.error.message
    } else {
      msg = loggingObject.message
    }

    const logMessage = `${[logTime, logLevel, logProcess].join(' ')} ${msg}\n`
    console.log(logFilePath)
    // Write the message to the log
    fs.appendFile(logFilePath!, logMessage, 'utf8')
    return true
  } catch (error) {
    console.error('[ERROR IN LOGGING]', error)
    return Promise.resolve(false)
  }
}
export { log, initializeLogger }
