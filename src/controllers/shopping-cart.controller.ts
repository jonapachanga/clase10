import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import ShoppingCartDaoFileImpl from "../services/impl/ShoppingCartDaoFileImpl";
import { IShoppingCart } from "../models/shopping-cart.model";

class ShoppingCartController {
    public shoppingCartDaoFile = new ShoppingCartDaoFileImpl();

    constructor() {
    }

    public getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const shoppingCarts: IShoppingCart[] = await this.shoppingCartDaoFile.findAll()

            res.status(StatusCodes.OK).json(shoppingCarts);
        } catch (e) {
            next(e);
        }
    }

    public findById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

        try{
            const shoppingCartId = req.params.id;

            const shoppingCart: IShoppingCart = await this.shoppingCartDaoFile.findById(shoppingCartId);

            res.status(StatusCodes.OK).json({ products: shoppingCart.products });
        } catch (e) {
            next(e);
        }
    }

    public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try{
            const { ...newShoppingCart } = req.body;

            newShoppingCart.createdAt = Date.now();
            newShoppingCart.modifiedAt = Date.now();

            const shoppingCart: IShoppingCart = await this.shoppingCartDaoFile.create(newShoppingCart);

            res.status(StatusCodes.OK).json(shoppingCart);
        } catch (e) {
            next(e);
        }
    }

    public update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try{
            const { ...shoppingCartToUpdate } = req.body;
            const shoppingCartId = req.params.id;

            shoppingCartToUpdate.modifiedAt = Date.now();

            const shoppingCart: IShoppingCart = await this.shoppingCartDaoFile.update(shoppingCartId, shoppingCartToUpdate);

            res.status(StatusCodes.OK).json(shoppingCart);
        } catch (e) {
            next(e);
        }
    }

    public delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try{
            const shoppingCartId = req.params.id;

            await this.shoppingCartDaoFile.delete(shoppingCartId);

            res.status(StatusCodes.OK);
        } catch (e) {
            next(e);
        }
    }

    public removeProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try{
            const shoppingCartId = req.params.id;
            const productId = req.params.id_prod;

            const updatedShoppingCart = await this.shoppingCartDaoFile.removeProduct(shoppingCartId, productId);

            res.status(StatusCodes.OK).json(updatedShoppingCart);
        } catch (e) {
            next(e);
        }
    }
}

export default ShoppingCartController;