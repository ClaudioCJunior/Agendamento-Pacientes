import { Schema, model, Document } from 'mongoose'

interface patientInterface extends Document {
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

const Patient = model<patientInterface>('patient', PatientSchema)

export default Patient
