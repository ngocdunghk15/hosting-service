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
  NODE = 'node'
}

export enum GitlabStateAction {
  CONNECT = 'connect',
  AUTH = 'auth'
}

export enum Token {
  ACCESS = 'accessToken',
  REFRESH = 'refreshToken'
}
