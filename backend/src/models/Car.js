import mongoose from 'mongoose';

const carSchema = new mongoose.Schema(
  {
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    mileage: { type: Number, default: 0 },
    imageUrl: { type: String, required: true },
    description: { type: String, default: '' }
  },
  { timestamps: true }
);

export default mongoose.model('Car', carSchema);
