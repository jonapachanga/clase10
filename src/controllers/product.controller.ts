import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import IProduct from "../models/product.model";
import ProductDaoFileImpl from "../services/impl/ProductDaoFileImpl";

class ProductController {
    public productDaoFile = new ProductDaoFileImpl();

    constructor() {
    }

    public getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const products: IProduct[] = await this.productDaoFile.findAll()

            res.status(StatusCodes.OK).json(products);
        } catch (e) {
            next(e);
        }
    }

    public findById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

        try{
            const productId = req.params.id;

            const product: IProduct = await this.productDaoFile.findById(productId);

            res.status(StatusCodes.OK).json(product);
        } catch (e) {
            next(e);
        }
    }

    public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try{
            const { ...newProduct } = req.body;

            const product: IProduct = await this.productDaoFile.create(newProduct);

            res.status(StatusCodes.OK).json(product);
        } catch (e) {
            next(e);
        }
    }

    public update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try{
            const { ...productToUpdate } = req.body;
            const productId = req.params.id;

            const product: IProduct = await this.productDaoFile.update(productId, productToUpdate);

            res.status(StatusCodes.OK).json(product);
        } catch (e) {
            next(e);
        }
    }

    public delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try{
            const productId = req.params.id;

            await this.productDaoFile.delete(productId);

            res.status(StatusCodes.OK);
        } catch (e) {
            next(e);
        }
    }
}

export default ProductController;