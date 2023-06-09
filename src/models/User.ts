import { Schema, model, Document } from 'mongoose'
import * as bcrypt from 'bcryptjs'
import { softDeletePlugin, SoftDeleteModel } from 'soft-delete-plugin-mongoose'

interface UserInterface extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  phone: Date;
}

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  phone: {
    type: Number,
    required: true
  }
})

UserSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10)
  this.password = hash

  next()
})

UserSchema.plugin(softDeletePlugin)

const User = model<UserInterface, SoftDeleteModel<UserInterface>>('User', UserSchema)

export default User
