type Config = {
  token: string
  guilds: string[]
  DATABASE_URL: string
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const config: Config = require('../config.json')
