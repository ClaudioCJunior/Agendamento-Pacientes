import { Schema, model, Document } from 'mongoose'
import { softDeletePlugin, SoftDeleteModel } from 'soft-delete-plugin-mongoose'

interface PatientInterface extends Document {
  name: string;
  surname: string;
  phone: number;
  userId: string;
  createdAt: Date;
}

const PatientSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

PatientSchema.plugin(softDeletePlugin)

const Patient = model<PatientInterface, SoftDeleteModel<PatientInterface>>('patient', PatientSchema)

export default Patient
