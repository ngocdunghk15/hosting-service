export enum Status {
  IDLE = 'idle',
  PENDING = 'pending',
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected'
}

export enum ServiceType {
  STATIC_WEB = 'static',
  WEB_SERVICE = 'web'
}

export enum Runtime {
  DOCKER = 'docker',
  NODE = 'nodejs',
  SPA = 'spa'
}

export enum GitlabStateAction {
  CONNECT = 'connect',
  AUTH = 'auth'
}

export enum Token {
  ACCESS = 'accessToken',
  REFRESH = 'refreshToken'
}

export enum ServiceStatusEnum {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILED = 'failed',
  WAIT = 'wait'
}
