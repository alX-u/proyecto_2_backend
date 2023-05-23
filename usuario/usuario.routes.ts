import express from "express";
import { createUser } from "./usuario.controller";

const router = express.Router();

// Ruta para crear un usuario
router.post("/", createUser);

export default router;
