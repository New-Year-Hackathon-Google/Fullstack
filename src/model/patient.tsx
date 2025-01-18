import { Schema, model, models, Model, Document } from 'mongoose';

export interface IPatient extends Document {
  name: string;
  dateOfBirth: string;
  roomNumber: number;
  bloodType: string;
  status: string;
  nurseName: string;
}

const patientSchema = new Schema<IPatient>(
  {
    name: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    roomNumber: { type: Number, required: true },
    bloodType: { type: String, required: true },
    status: { type: String, required: true },
    nurseName: { type: String, required: true },
  },
  {
    collection: 'Patients',
    timestamps: true,
  },
);

const Patient: Model<IPatient> =
  models.Patient || model<IPatient>('Patient', patientSchema);

export default Patient;
