const envs = {
  local: 'development',
  staging: 'staging',
  production: 'production',
  dist: 'dist'
}

const defaultEnv = envs.local

const { debugError, debugApp } = require('./debug')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = defaultEnv
  debugError(
    `No Env has been found. By default, ${defaultEnv} has been set as NODE_ENV.`
  )
}

const dotEnv = require('dotenv-flow')
dotEnv.config()

debugApp(`Environment: ${process.env.NODE_ENV}`)
