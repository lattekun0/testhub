export interface AuthPayload {
  id: string
}

declare module 'express' {
  export interface Request {
    user?: AuthPayload
  }
}

export interface RegisterInput {
  name: string
  email: string
  password: string
}

export interface LoginInput {
  email: string
  password: string
}

export interface IUserPayload {
  id: string
  email: string
  name?: string
}
