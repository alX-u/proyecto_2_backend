import { Request, Response } from "express";
import Pedido, { IPedido } from "./pedido.model"; // Importa el modelo de usuario definido en Mongoose
import { generateToken } from "../auth/auth_token";


export const createPedido = async (req: Request, res: Response) => {
    try {
      const { client, products, totalPrice,} = req.body; // Obtén las propiedades del cuerpo de la solicitud
  
      // Crea un nuevo pedido utilizando el modelo de Mongoose
      const pedido = new Pedido({
        client,
        products,
        totalPrice,
      });
  
      // Guarda el usuario en la base de datos
      await pedido.save();
  
      res.status(201).json({ message: "Pedido creado exitosamente", pedido });
    } catch (error) {
      res.status(500).json({ message: "Error al crear el pedido", error });
    }
  };

  export async function getPedidoById(req: Request, res: Response) {
    try {
      const { _id } = req.params;
  
      const pedido = await Pedido.findOne({ _id: _id, active: true });
  
      res.status(200).json(pedido);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al obtener el pedido" });
    }
  }  

  export async function getPedidobyDateAndUser( req: Request, res: Response ) {
    
    try {
      const { user, startDate, endDate } = req.query;
      const filtro: any = {};
      
      if (startDate && endDate) {
        filtro.startDate = startDate;
        filtro.endDate = endDate;
      }

      filtro.user = user;
      //Buscamos solo los que estén activos
      filtro.active = true;
      const pedido = await Pedido.find(filtro);
      res.status(200).json(pedido);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al obtener los pedidos" });
    }
  }

  export async function updatedPedido(req: Request, res: Response) {
    //Aquí opto por usar tanto params como body
    const { _id } = req.params;
    const {comments, score} = req.body;
  
    try {
      const updatedPedido = await Pedido.findOneAndUpdate(
        { _id: _id, active: true },
        {comments:comments,score:score},
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(200).json(updatedPedido);
    } catch (error) {
      console.log("Error: ", error);
      res.status(500).json({ message: "Error al actualizar el pedido." });
    }
  }


