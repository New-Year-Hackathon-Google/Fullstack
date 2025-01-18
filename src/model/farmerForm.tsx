import { Schema, model, models, Model, Document } from 'mongoose';

export interface IPatient extends Document {
  name: string;
  dateOfBirth: string;
  room: number;
  status: string;
}

const patientSchema = new Schema<IPatient>(
  {
    name: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    room: { type: Number, required: true },
    status: { type: String, required: true },
  },
  {
    collection: 'farmerForm',
    timestamps: true,
  },
);

const Patient: Model<IPatient> =
  models.Patient || model<IPatient>('Patient', patientSchema);

export default Patient;
