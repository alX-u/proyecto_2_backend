import { Request, Response } from "express";
import User from "./usuario.model"; // Importa el modelo de usuario definido en Mongoose

// Controlador para la creación de usuarios
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, password, email, phone_number, address, role } = req.body; // Obtén las propiedades del cuerpo de la solicitud

    // Crea un nuevo usuario utilizando el modelo de Mongoose
    const user = new User({
      name,
      password,
      email,
      phone_number,
      address,
      role,
    });

    // Guarda el usuario en la base de datos
    await user.save();

    res.status(201).json({ message: "Usuario creado exitosamente", user });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el usuario", error });
  }
};
