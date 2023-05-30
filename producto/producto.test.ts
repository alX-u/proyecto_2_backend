//Imports
import {
    createProduct,
    getProductById,
    getProductCategoriesByUser,
    getProductsbyCategoryAndUser,
    updateProduct,
    deleteProduct,
} from "./producto.controller";
import productRoutes from "./producto.routes";
const mongoose = require("mongoose");
const cors = require("cors");
import express, { Request, Response } from "express";
import {
    describe,
    expect,
    test,
    beforeAll,
    afterAll,
    jest,
} from "@jest/globals";
import request from "supertest";
import User from '../usuario/usuario.model';

//Vars
const app = express();
let session: any = {};

/* Opening database connection before all tests. */
beforeAll(async () => {
    mongoose.model('user', User.schema);
    app.use(cors());
    app.use(express.json());
    app.use("/", productRoutes);
    const url = `mongodb+srv://vertel:h3nt3DTE804Kdx76@proyecto2backend.yunr3x4.mongodb.net/`;
    await mongoose.connect(url);
    session = await mongoose.startSession();
    session.startTransaction();
});

/* Closing database connection after all tests. */
afterAll(async () => {
    await session.abortTransaction();
    session.endSession();
    await mongoose.connection.close();
});

//Pruebas de creación de producto

describe('create product', () => {
    test("controller OK", async () => {
        const req: Partial<Request> = {
            body: {
                name: 'Gaseosa',
                description: 'Coke',
                category: 'Bebida',
                price: 2500,
                user: '646d46f2355396ff1322b252',
                session
            },
        };
        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            json: jest.fn(),
        } as unknown as Response;
        await createProduct(req as Request, res as Response);
        expect(res.status).toHaveBeenCalledWith(201);
    });

    test("controller ERROR", async () => {
        const req: Partial<Request> = {
            body: {
                name: 'Gaseosa',
                description: 'Coke',
                price: 2500,
                user: 'asldalskmdaosk',
                session
            },
        };
        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            json: jest.fn(),
        } as unknown as Response;
        await createProduct(req as Request, res as Response);
        expect(res.status).toHaveBeenCalledWith(500);
    });
});

//Pruebas de read product con id
describe('read product (id)', () => {
    test("controller OK", async () => {
        const req: Partial<Request> = {
            params: { _id: "64753d8481a4f535567542fb" },
        };
        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;
        await getProductById(req as Request, res as Response);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test("controller ERROR", async () => {
        const req: Partial<Request> = {
            params: { _id: "1234564789798" },
        };
        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;
        await getProductById(req as Request, res as Response);
        expect(res.status).toHaveBeenCalledWith(500);
    });
});



describe("updateProduct", () => {
    test("controller OK", async () => {
      const req: Partial<Request> = {
        params:{_id: '64753d8481a4f535567542fb'},
        body: {
          description: "nueva description",
          session
        },
      };
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn(),
      } as unknown as Response;
      await updateProduct(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(200);
      //Abortamos transacción para que no escriba en la base de datos
  
    });
  
    test("controller ERROR", async () => {
      //Iniciamos transacción
  
      const req: Partial<Request> = {
        params:{_id: '1'},
        body: {
          description: "nueva description",
          session
        },
      };
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn(),
      } as unknown as Response;
      await updateProduct(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(500);
      //Abortamos transacción para que no escriba en la base de datos
  
    });
  });
  
  describe("deleteProduct", () => {
    test("controller OK", async () => {
      const req: Partial<Request> = {
        params: {
          _id: '64753d8481a4f535567542fb',
        },
        body: { session }
      };
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn(),
      } as unknown as Response;
      await deleteProduct(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(200);
      //Abortamos transacción para que no escriba en la base de datos
  
    });
  
    test("controller ERROR", async () => {
      //Iniciamos transacción
      const req: Partial<Request> = {
        params: {
          _id: '1',
        },
        body: { session }
      };
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn(),
      } as unknown as Response;
      await deleteProduct(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(500);
      //Abortamos transacción para que no escriba en la base de datos
  
    });
  });
