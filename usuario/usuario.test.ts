import { Request, Response } from "express";
import request from "supertest";
import userRoutes from "./usuario.routes";
import { describe, expect, it, test } from '@jest/globals';

jest.useRealTimers();

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




