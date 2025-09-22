import { getProjectsDir } from '@src/main/services/file-system'
import { log } from '@src/main/services/logging/logger'
import fs from 'fs/promises'
import path from 'path'
import { v4 } from 'uuid'

const createFile = async (): Promise<boolean> => {
  try {
    log({
      level: 'INFO',
      message: 'Creating Project',
      process: 'Node'
    })

    // Create project UUID
    const projectUUID = v4()

    // Create the project directory
    const projectDir: string = path.join(getProjectsDir(), projectUUID)
    await fs.mkdir(projectDir, { recursive: true })

    // Create files for storing project metadata
    // project.json
    // layout.json
    // settings.json
    // queries/
    // connections.json
    return Promise.resolve(true)
  } catch (error) {
    log({
      level: 'WARN',
      message: 'Failed to create project. See further log for details.',
      process: 'Node'
    })
    log({
      level: 'ERROR',
      error: error as Error,
      process: 'Node'
    })
    return false
  }
}

export default createFile
