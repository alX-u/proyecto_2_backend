import express from "express";
import { createUser, deleteUser, getUserById } from "./usuario.controller";

const router = express.Router();

// Ruta para crear un usuario
router.post("/", createUser);

//Ruta para obtener un usuario según el ID
router.get("/ById/:_id", getUserById);

//Ruta para inhabilitar al usuario según el ID
router.delete("/:_id", deleteUser);

export default router;
