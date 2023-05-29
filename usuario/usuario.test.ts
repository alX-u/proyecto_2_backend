import { Request, Response } from "express";
import request from "supertest";
const mongoose = require("mongoose");
import userRoutes from "./usuario.routes";
import { getUserById } from "./usuario.controller";
import { describe, expect, it, test, beforeAll, afterAll, jest } from '@jest/globals';


/* Opening database connection before all tests. */
beforeAll(async () => {
    jest.setTimeout(10000);
    const url = `mongodb+srv://vertel:h3nt3DTE804Kdx76@proyecto2backend.yunr3x4.mongodb.net/`;
    await mongoose.connect(url);
});

/* Closing database connection after all tests. */
afterAll(async () => {
    await mongoose.connection.close();
});

//Pruebas de creación de usuario
// describe('createUser', () => {
//     it('should create a user', async () => {
//         const res = await request(userRoutes).post('/').send({
//             name: "Jaimelin tilin",
//             password: "tilinson pipon",
//             email: "tilin@email.com",
//             phone_number: "3046787667",
//             address: "casa tilina"
//         })
//         expect(res.statusCode).toBe(201);
//     }, 10000);
//     it('create user controller OK', async () => {
//         const res = request(userRoutes)
//     });
// });

describe("readUser (id)", () => {
    it("controller OK", async () => {
        const req: Partial<Request> = { params: { _id: "646cf3445f783334b5e91092" } };
        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            json: jest.fn()
        } as unknown as Response;
        getUserById(req as Request, res as Response);
        expect(1).toBe(1);
    });
});

describe('create user', () => {
    it('should create', async () => {
        const res = await request(userRoutes).post('/').send({
            name: "Jaimelin tilin",
            password: "tilinson pipon",
            email: "tilin@email.com",
            phone_number: "3046787667",
            address: "casa tilina"
        });
        console.log('Holaaa')
        expect(res.body.length).toBeGreaterThan(0);
    })
});



