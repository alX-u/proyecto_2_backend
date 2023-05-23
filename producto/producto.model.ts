import { Schema, model } from "mongoose";

interface IProduct {
  name: string;
  description: string;
  category: string;
  price: number;
  active: boolean;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      maxlength: 140,
    },
    category: {
      type: String,
      required: true,
    },
    price: { type: Number, required: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true, collection: "products" }
);

export default model<IProduct>("product", productSchema);
