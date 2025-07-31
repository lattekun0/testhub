import { Document } from 'mongoose'

export interface IUser extends Document {
  email: string
  password: string
  name: string
  avatar?: string
  createdAt?: Date
  updatedAt?: Date
}
