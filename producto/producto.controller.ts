import { Request, Response } from "express";
import Product from "./producto.model"; // Importa el modelo de usuario definido en Mongoose
import { generateToken } from "../auth/auth_token";

