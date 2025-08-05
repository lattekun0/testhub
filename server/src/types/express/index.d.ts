import { IUserPayload } from '../../types/auth'

declare global {
  namespace Express {
    interface Request {
      user?: IUserPayload
    }
  }
}
