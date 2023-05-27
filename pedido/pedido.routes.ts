import express from "express";
import { authenticateToken } from "../auth/auth_token";
import {
  createPedido,
  getPedidoById,
  getPedidobyDateAndUser,
  updatedPedido
} from "./pedido.controller";

const router = express.Router();

router.post("/", createPedido);

router.get("/ById/:_id", getPedidoById);

//Ruta para obtener un producto según la categoría, el usuario y/o el texto de búsqueda
router.get("/ByDateAndUser", getPedidobyDateAndUser);

router.patch("/:_id", authenticateToken, updatedPedido);

export default router;
