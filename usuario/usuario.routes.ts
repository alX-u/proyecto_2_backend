import express from "express";
import { authenticateToken } from "../auth/auth_token";
import { createUser, deleteUser, getUserByCreds, getUserById } from "./usuario.controller";

const router = express.Router();

// Ruta para crear un usuario
router.post("/", createUser);

//Ruta para obtener un usuario según el ID
router.get("/ById/:_id", getUserById);

//Ruta para obtener un usuario según el ID
router.get("/ByCreds/", getUserByCreds);

//Ruta para inhabilitar al usuario según el ID (necesita token)
router.delete("/:_id", authenticateToken, deleteUser);

export default router;
