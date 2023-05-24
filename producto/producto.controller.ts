import { Request, Response } from "express";
import Product from "./producto.model"; // Importa el modelo de usuario definido en Mongoose
import { generateToken } from "../auth/auth_token";

//Creación de productos
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, category, price, user } = req.body; // Obtén las propiedades del cuerpo de la solicitud

    // Crea un nuevo producto utilizando el modelo de Mongoose
    const product = new Product({
      name,
      description,
      category,
      price,
      user,
    });

    // Guarda el usuario en la base de datos
    await product.save();

    res.status(201).json({ message: "Producto creado exitosamente", product });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el producto", error });
  }
};

//Obtener product por id
export async function getProductById(req: Request, res: Response) {
  try {
    const { _id } = req.params;

    const product = await Product.findOne({ _id: _id, active: true });

    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al obtener el usuario" });
  }
}
