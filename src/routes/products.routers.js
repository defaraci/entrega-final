import {Router} from "express";
const router = Router();

import { 
    getAllProducts,
    searchProducts,
    getProductById,
    createProduct,
 } from "../controllers/products.controller.js";

import {auth} from "../middlewares/auth.middleware.js";

router.get("/products", getAllProducts);
router.get("/products/search",searchProducts);
router.get("/products/:id", auth, getProductById);

router.post("/products", createProduct);

export default router;
