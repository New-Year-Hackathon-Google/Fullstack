import { Schema, model, models, Model, Document } from 'mongoose';

export interface IYouthForm extends Document {
  id: string;
  name: string;
  skills: string[];
  location: string;
  availability: string;
}

const youthFormSchema = new Schema<IYouthForm>(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    skills: { type: [String], required: true },
    location: { type: String, required: true },
    availability: { type: String, required: true },
  },
  {
    collection: 'youthForm',
    timestamps: true,
  },
);

const YouthForm: Model<IYouthForm> =
  models.YouthForm || model<IYouthForm>('YouthForm', youthFormSchema);

export default YouthForm;
