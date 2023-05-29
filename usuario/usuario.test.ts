import { Request, Response } from "express";
import request from "supertest";
const mongoose = require("mongoose");
import userRoutes from "./usuario.routes";
import { describe, expect, it, test } from '@jest/globals';

jest.useRealTimers();

beforeEach(async () => {
    const url = `mongodb+srv://vertel:h3nt3DTE804Kdx76@proyecto2backend.yunr3x4.mongodb.net/`;
    await mongoose.connect(url);
});

/* Closing database connection after each test. */
afterEach(async () => {
    await mongoose.connection.close();
});

//Pruebas de creación de usuario
describe('createUser', () => {
    it('should create a user', async () => {
        const res = await request(userRoutes).post('/').send({
            name: "Jaimelin tilin",
            password: "tilinson pipon",
            email: "tilin@email.com",
            phone_number: "3046787667",
            address: "casa tilina"
        })
        expect(res.statusCode).toBe(201);
    }, 10000)
});




