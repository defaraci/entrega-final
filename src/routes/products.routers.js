import {Router} from "express";
const router = Router();

import { 
    getAllProducts,
    searchProducts,
    getProductById,
    createProduct,
    deleteProduct,
 } from "../controllers/products.controller.js";

import {auth} from "../middlewares/auth.middleware.js";

router.get("/products", getAllProducts);
router.get("/products/search",searchProducts);
router.get("/products/:id", auth, getProductById);

router.post("/products", createProduct);

router.delete("/products/:id", deleteProduct);

export default router;
