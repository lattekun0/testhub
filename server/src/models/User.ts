import mongoose, { Document, Types, Schema } from 'mongoose'

export interface IUser extends Document {
  email: string
  password: string
  name: string
  avatar?: string
  _id?: Types.ObjectId
  createdAt?: Date
  updatedAt?: Date
}

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
