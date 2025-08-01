import type { User } from './user'

export type AuthStore = {
  user: User
  setUser: (user: User) => void
  clearUser: () => void
}
