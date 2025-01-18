import { Schema, model, models, Document } from 'mongoose';

export interface IPatient extends Document {
  patientId: string;
  name: string;
  dateOfBirth: string;
  height: string;
  weight: string;
  roomNumber: string;
  bloodType: string;
  status: string;
  nurseName: string;
}

const patientSchema = new Schema<IPatient>(
  {
    patientId: { type: String, required: true },
    name: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    height: { type: String, required: true },
    weight: { type: String, required: true },
    roomNumber: { type: String, required: true },
    bloodType: { type: String, required: true },
    status: { type: String, required: true },
    nurseName: { type: String, required: true },
  },
  {
    collection: 'Patients',
    timestamps: true,
  },
);

const Patient =
  models.PatientModel || model<IPatient>('PatientModel', patientSchema);

export default Patient;
