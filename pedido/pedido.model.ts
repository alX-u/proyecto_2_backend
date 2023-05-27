import { Schema, model } from "mongoose";

export interface IPedido {
  client: Schema.Types.ObjectId;
  seller: Schema.Types.ObjectId;
  products: [{id: Schema.Types.ObjectId, quantity: number}];
  totalPrice: number;
  comments: String;
  score: Number;
  active: boolean;
}

const productSchema = new Schema<IPedido>(
  {
    client: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
      validate: {
        validator: async function (value) {
          const user = await model("user").findOne({
            _id: value,
          });
          return user !== null || user.active == true;
        },
        message: "Usuario no encontrado",
      },
    },
    seller:{
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
        validate: {
          validator: async function (value) {
            const user = await model("user").findOne({
              _id: value,
            });
            return user !== null || user.active == true;
          },
          message: "Usuario no encontrado",
        },
      },
    products: [{ producto:{type:Schema.Types.ObjectId, 
        ref:"products", 
        required: true, 
        validate: {
            validator: async function (value){
        const producto = await model("product").findOne({
            _id:value
        });
        if(producto==null || producto.active ==true){
          throw new Error('No se encontro el producto');
        }
      }}},
      cantidad:{type:Number, required:true}}
      ],
    totalPrice: {
      type: Number,
      required: true
    },
    comments: {
      type: String,
    },
    score: { 
      type: Number
    },
    
    active: { type: Boolean, default: true },
  },
  { timestamps: true, collection: "pedidos" }
);

export default model<IPedido>("pedido", productSchema);
