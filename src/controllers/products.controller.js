import * as Service from "../services/products.services.js";
import * as Model from "../models/products.model.js";

export const getAllProducts = async (req, res) => {
    const products = await Service.getAllProducts()
    res.json(products);
};

export const searchProducts = (req,res) => {
    const { name } = req.query;

    if (!name) {
        return res.status(400).json({error: "El nombre es requerido"});
    }

    const products = module.getAllProducts();

    const productsFiltered = products.filter((item)=>
        item.name.toLowerCase().includes(name.toLowerCase())
    );

    if (productsFiltered.length == 0) {
        return res.status(404).json({ error: "No se encontraron los productos"});
    }

    res.json(productsFiltered);
};

export const getProductById = async (req, res) => {
    const { id } = req.params;
    const product = await Service.getProductById(id);
    if (product){
        res.json(product);
    } else {
        res.status(404).json({ message: "Producto no encontrado"});
    }
};

export const createProduct = async (req, res) => {
    const { name, price, categories } = req.body;

    const product = await Model.createProduct({name, price, categories});

    res.status(201).json(product);
};

export const deleteProduct = async (req, res) => {
    const {id} = req.params;

    const deleted = await Model.deleteProduct(id);

    if (!deleted) {
        return res.status(404).json({error: "Producto no encontrado"});
    }

    res.status(204).send();
};

export const getProductStats = (req, res) => {
    const total = products.length;

    const maxPrice = products.length > 0 ? Math.max(...products.map(p => p.price)) : 0;
    const minPrice = products.length > 0 ? Math.min(...products.map(p => p.price)) : 0;

    res.json({
        total,
        maxPrice,
        minPrice,
        promedio: total > 0 ? (products.reduce((sum, p) => sum + p.price, 0) / total).toFixed(2) : 0
    });
};
