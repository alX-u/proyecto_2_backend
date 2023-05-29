import { Request, Response } from "express";
import request from "supertest";
const mongoose = require("mongoose");
import {
    createUser,
    deleteUser,
    getUserByCreds,
    getUserById,
    updateUser,
} from "./usuario.controller";
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





