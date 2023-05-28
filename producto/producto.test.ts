import {createProduct,
    getProductById,
    getProductCategoriesByUser,
    getProductsbyCategoryAndUser,
    updateProduct,
    deleteProduct,
} from "./producto.controller";
import Product, { IProduct } from "./producto.model";
import express from "express";
import request from "supertest";
import {describe, expect, test} from '@jest/globals';

import router from "./producto.routes";

describe("Crear producto", async ()=> {
test("controller OK",()=> {
    const product = new Product({
        name: "Mintendo Stitch",
        description: "La nueva consola superpoderosa para Alejandro Vertel",
        category: "Electrónicos",
        price: "4000000",
        user: "646d46f2355396ff1322b252",
      });
});
});
