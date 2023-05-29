import express, { Request, Response } from "express";
const cors = require("cors");
import request from "supertest";
const mongoose = require("mongoose");
import userRoutes from "./usuario.routes";
import { createUser, getUserByCreds, getUserById } from "./usuario.controller";
import {
  describe,
  expect,
  test,
  beforeAll,
  afterAll,
  jest,
} from "@jest/globals";
const app = express();

/* Opening database connection before all tests. */
beforeAll(async () => {
  app.use(cors());
  app.use(express.json());
  app.use("/", userRoutes);
  const url = `mongodb+srv://vertel:h3nt3DTE804Kdx76@proyecto2backend.yunr3x4.mongodb.net/`;
  await mongoose.connect(url);
});

/* Closing database connection after all tests. */
afterAll(async () => {
  await mongoose.connection.close();
  await mongoose.connection.close();
});

//Pruebas de creación de usuario
describe("createUser", () => {
  test("controller OK", async () => {
    //Iniciamos transacción
    const session = await mongoose.startSession();
    session.startTransaction();
    const req: Partial<Request> = {
      body: {
        name: "HEY YO ITS THE A-TRAIN BABY",
        password: "hola123",
        email: "hola@gmail.com",
        phone_number: "3003664859",
        address: "Calle ndoinasdoi",
      },
    };
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    } as unknown as Response;
    await createUser(req as Request, res as Response, session);
    expect(res.status).toHaveBeenCalledWith(201);
    //Abortamos transacción para que no escriba en la base de datos
    await session.abortTransaction();
    session.endSession();
  });

  test("controller ERROR", async () => {
    //Iniciamos transacción
    const session = await mongoose.startSession();
    session.startTransaction();
    const req: Partial<Request> = {
      body: {
        name: "HEY YO ITS THE A-TRAIN BABY",
        password: "hola123",
        email: "holagmailcom",
        phone_number: "45121",
      },
    };
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    } as unknown as Response;
    await createUser(req as Request, res as Response, session);
    expect(res.status).toHaveBeenCalledWith(500);
    //Abortamos transacción para que no escriba en la base de datos
    await session.abortTransaction();
    session.endSession();
  });
});

//Pruebas de lectura de usuario por el ID
describe("readUser (id)", () => {
  test("controller OK", async () => {
    const req: Partial<Request> = {
      params: { _id: "646cf3445f783334b5e91092" },
    };
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    await getUserById(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("controller ERROR", async () => {
    //_id vacío
    const req: Partial<Request> = { params: { _id: "" } };
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    await getUserById(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(500);
  });

  test("Endpoint OK", async () => {
    const testId = "646cf3445f783334b5e91092";
    const { status } = await request(app)
      .get(`/ById/${testId}`)
      .set("Accept", "application/json");
    expect(status).toBe(200);
  });

  test("Endpoint ERROR", async () => {
    const testId = "hola profe";
    const { status } = await request(app)
      .get(`/ById/${testId}`)
      .set("Accept", "application/json");
    expect(status).toBe(500);
  });
});

//Pruebas de lectura de usuario por las credenciales
describe("readUser (credenciales)", () => {
  test("controller OK", async () => {
    const req: Partial<Request> = {
      query: { email: "piter@abc.com", password: "piter" },
    };
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    } as unknown as Response;
    await getUserByCreds(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("controller ERROR", async () => {
    //"email" bad format
    const req: Partial<Request> = {
      params: { email: "piter", password: "piter" },
    };
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    } as unknown as Response;
    await getUserByCreds(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(500);
  });

  test("Endpoint OK", async () => {
    const testId = "646cf3445f783334b5e91092";
    const { status } = await request(app)
      .get(`/ById/${testId}`)
      .set("Accept", "application/json");
    expect(status).toBe(200);
  });

  test("Endpoint ERROR", async () => {
    const testId = "hola profe";
    const { status } = await request(app)
      .get(`/ById/${testId}`)
      .set("Accept", "application/json");
    expect(status).toBe(500);
  });
});
