import mongoose, { models, Schema } from 'mongoose';

const farmerFormSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },

    duration: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'farmerForm',
  },
);

const FarmerForm =
  models.FarmerForm || mongoose.model('FarmerForm', farmerFormSchema);

export default FarmerForm;
