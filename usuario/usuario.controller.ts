import { Request, Response } from "express";
import User from "./usuario.model"; // Importa el modelo de usuario definido en Mongoose

// Creación de usuarios
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

//Obtener usuario
export async function getUserById(req: Request, res: Response) {
  try {
    //Para usuario admin
    const { _id } = req.params;

    const user = await User.findOne({ _id: _id, active: true });

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al obtener el usuario" });
  }
}

//Borrar usuarios
export async function deleteUser(req: Request, res: Response) {
  //Aquí uso params
  const { _id } = req.params;

  try {
    //El usuario se inhabilita, en vez de borrarse
    const deletedUser = await User.findOneAndUpdate(
      { _id: _id, active: true },
      { active: false }
    );
    if (!deletedUser)
      return res.status(404).json({ message: "Usuario no encontrado" });

    res.status(200).json({ message: "Usuario inhabilitado correctamente." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al eliminar el usuario" });
  }
}
