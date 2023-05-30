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