import mongoose, { Schema, Document, Types } from 'mongoose'

export interface ProjectMember {
  user: Types.ObjectId
  role: 'admin' | 'editor' | 'viewer'
}

export interface IProject extends Document {
  name: string
  description?: string
  owner: Types.ObjectId
  members: ProjectMember[]
  createdAt: Date
  updatedAt: Date
}

const ProjectSchema: Schema<IProject> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '', trim: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    members: [
      {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        role: { type: String, enum: ['admin', 'editor', 'viewer'], required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
)

const Project = mongoose.model<IProject>('Project', ProjectSchema)

export default Project
