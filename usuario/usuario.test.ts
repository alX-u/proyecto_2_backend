import express,{ Request, Response } from "express";
const cors = require("cors");
import request from "supertest";
const mongoose = require("mongoose");
import userRoutes from "./usuario.routes";
import { getUserById } from "./usuario.controller";
import { describe, expect, it, test, beforeEach, afterEach, beforeAll, afterAll, jest} from '@jest/globals';
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
});

//Pruebas de creación de usuario
// describe('createUser', () => {
//     test('createUser Endpoint OK', async () => {
//         const { status} = await request(userRoutes).post('/').send({
//             name: "Jaimelin tilin",
//             password: "tilinson pipon",
//             email: "tilin@email.com",
//             phone_number: "3046787667",
//             address: "casa tilina"
//         }).set("Accept","application/json")
//         console.log("goaoao")
//         expect(status).toBe(201);
//     }, 20000);
// });

describe("readUser (id)", () => {
    test("controller OK", async () => {
        const req: Partial<Request> = {params: {_id: "646cf3445f783334b5e91092"}};
        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            json: jest.fn()
          }as unknown as Response;
        await getUserById(req as Request,res as Response);
        expect(res.status).toHaveBeenCalledWith(200);
    });
    test("Endpoint OK", async () => {
        const testId = "646cf3445f783334b5e91092";
        const {status} = await request(app).get(`/ById/${testId}`).set('Accept', 'application/json');
        expect(status).toBe(200);
    })
});



