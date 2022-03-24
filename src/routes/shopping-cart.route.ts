import { Routes } from "../interfaces/routes.interface";
import { Router } from "express";
import ShoppingCartController from "../controllers/shopping-cart.controller";

class ShoppingCartRoute implements Routes{
    public router = Router();
    public path = '/shopping-cart';
    public shoppingCartController = new ShoppingCartController();

    constructor() {
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get(`${this.path}`, this.shoppingCartController.getAll); // ok
        this.router.get(`${this.path}/:id/products`, this.shoppingCartController.findById);
        this.router.post(`${this.path}`, this.shoppingCartController.create);
        this.router.put(`${this.path}/:id`, this.shoppingCartController.update);
        this.router.delete(`${this.path}/:id`, this.shoppingCartController.delete);
        this.router.put(`${this.path}/:id/products/:id_prod`, this.shoppingCartController.removeProduct);
    }

}

export default ShoppingCartRoute;