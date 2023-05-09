const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

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

//Ruta de usuarios
