import { Schema, model, Document } from 'mongoose';

interface ProductProps {
  name: string;
  price: string;
}

interface RegisterInterface extends Document {
  name: string;
  email: string;
  contact: string;
  company: string;
  date: string;
  notes: string;
  situation: string;
  products: ProductProps;
}

const RegisterSchema = new Schema(
  {
    name: String,
    email: String,
    contact: String,
    company: String,
    date: String,
    notes: String,
    situation: String,
    products: Array,
  },
  {
    timestamps: true,
  },
);

export default model<RegisterInterface>('Register', RegisterSchema);
