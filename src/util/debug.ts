import debug from 'debug'

if (process.env.NODE_ENV !== 'production') {
  debug.enable('server:*')
}

const namespaces = {
  debugApp: debug('server:app'),
  debugError: debug('server:error'),
  debugDB: debug('server:db'),
  debugRedis: debug('server:redis'),
  debugGRPC: debug('server:grpc'),
  debugController: debug('server:controller')
}

export const { debugApp } = namespaces
export const { debugError } = namespaces
export const { debugDB } = namespaces
export const { debugRedis } = namespaces
export const { debugGRPC } = namespaces
export const { debugController } = namespaces
