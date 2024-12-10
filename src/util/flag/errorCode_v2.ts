export default {
  request: {
    invalid_body: 'INVALID_BODY',
    invalid_routes: 'INVALID_ROUTES',
    invalid_cors: 'CORS_BLOCKED',
    empty_data: 'EMPTY_DATA',
    failed_insert: 'FAILED_REGISTER_DATA',
    failed_update: 'FAILED_UPDATE_DATA',
    failed_delete: 'FAILED_DELETE_DATA',
    data_exists: 'DATA_ALREADY_EXISTS',
    request_blocked: 'REQUEST_BLOCKED'
  },
  authentication: {
    invalid_credential: 'INVALID_CREDENTIALS',
    unauthorized_access: 'UNAUTHORIZED_ACCESS',
    missmatch_token: 'TOKEN_MISSMATCH',
    expired_token: 'EXPIRED_ACCESS',
    oauth_failed: 'OAUTH_FAILED',
    invalid_token: 'INVALID_TOKEN',
    invalid_otp: 'INVALID_OTP',
    user_exist: 'USER_ALREADY_EXIST',
    user_blocked_temp: 'USER_BLOCKED_TEMPORARY',
    user_blocked_permanent: 'USER_BLOCKED_PERMANENT',
    duplicated_active_session: 'USER_ALREADY_LOGEDDIN'
  },
  service: {
    data_fetch_error: 'DATA_FETCH_ERROR',
    grpc_error: 'SERVICE_DEPENDENCY_UNAVAILABLE',
    messaging_failed: 'MESSAGING_ERROR',
    service_unreachable: 'SERVICE_UNREACHABLE'
  }
}
