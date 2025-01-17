import { Schema, model, models, Model, Document } from 'mongoose';

export interface IFarmerForm extends Document {
  name: string;
  type: string;
  imageUrl: string;
  duration: string;
}

const farmerFormSchema = new Schema<IFarmerForm>(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    imageUrl: { type: String, required: true },
    duration: { type: String, required: true },
  },
  {
    collection: 'farmerForm',
    timestamps: true,
  },
);

const FarmerForm: Model<IFarmerForm> =
  models.FarmerForm || model<IFarmerForm>('FarmerForm', farmerFormSchema);

export default FarmerForm;
