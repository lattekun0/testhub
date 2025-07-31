import mongoose, {  Schema } from 'mongoose'
import { IUser } from '../types/user'


const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    avatar: { type: String },
  },
  { timestamps: true }
)

export const User = mongoose.model<IUser>('User', userSchema)
