import express from "express";
const mongoose = require("mongoose");
const cors = require("cors");
import userRoutes from "./usuario/usuario.routes";
import productRoutes from "./producto/producto.routes";
import pedidoRoutes from "./pedido/pedido.routes";
import * as dotenv from 'dotenv';

dotenv.config();

// Creación de la app
const app = express();

// Esta es mi conexión a MongoDB
const url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@proyecto2backend.yunr3x4.mongodb.net/`;

async function connect(): Promise<void> {
  try {
    await mongoose.connect(url);
    console.log("DataBase Connected");
    app.listen(8080, () => {
      console.log("App Listened on port 8080");
    });
  } catch (error) {
    console.log(error);
  }
}
connect();

// Middlewares
app.use(cors());
app.use(express.json());

//Rutas de usuarios
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/pedidos", pedidoRoutes);


// Endpoint para 404
app.use((req: express.Request, res: express.Response) => {
  res.status(404).json({ message: "Not found." });
});
