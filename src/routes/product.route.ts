import { Routes } from "../interfaces/routes.interface";
import { Router } from "express";
import ProductController from "../controllers/product.controller";

class ProductRoute implements Routes{
    public productController = new ProductController();
    public router = Router();
    public path = '/products';

    constructor() {
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get(`${this.path}`, this.productController.getAll);
        this.router.get(`${this.path}/:id`, this.productController.findById);
        this.router.post(`${this.path}`, this.productController.create);
        this.router.put(`${this.path}/:id`, this.productController.update);
        this.router.delete(`${this.path}/:id`, this.productController.delete);
    }

}

export default ProductRoute;