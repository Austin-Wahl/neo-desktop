export type LogTypes = 'ERROR' | 'WARN' | 'INFO'
export type LogProcess = 'Node' | 'Renderer'

export type LoggingObject =
  | {
      level: 'ERROR'
      error: Error
      process: LogProcess
    }
  | {
      level: 'WARN' | 'INFO'
      message: string
      process: LogProcess
    }
