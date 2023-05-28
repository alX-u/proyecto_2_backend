import {createUser,
    deleteUser,
    getUserByCreds,
    getUserById,
    updateUser,
} from "./usuario.controller";

import {Request, Response } from "express";
import request from "supertest";
import {describe, expect, test} from '@jest/globals';

//describe("Create usuario", () => {});

describe("Read usuario (id)", () => {
    test("controller OK", ()=> {
        const req = new Request('/users',
        {method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer xxxxxxxx',
        },
        });
    })
});