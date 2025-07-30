import * as Model from "../models/products.model.js";

export const getAllProducts = (req, res) => {
    return Model.getAllProducts();
};