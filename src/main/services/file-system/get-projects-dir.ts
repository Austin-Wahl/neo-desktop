import { app } from 'electron'
import path from 'path'

/**
 * Checks within the Neo directory for a 'projects' folder.
 * @returns {string} Returns the directory of the projects directory or null if it does not exist
 */
const getProjectsDirectory = (): string => {
  return path.join(app.getPath('userData'), 'projects')
}

export default getProjectsDirectory
