import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import IProduct from "../models/product.model";
import ProductDaoFileImpl from "../services/impl/products/ProductDaoFileImpl";
import ProductDaoMongoDbImpl from "../services/impl/products/ProductDaoMongoDbImpl";
import Product from "../models/productSchema";

class ProductController {
    public productDao = new ProductDaoMongoDbImpl();

    constructor() {
    }

    public getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const products: IProduct[] = await this.productDao.findAll()

            res.status(StatusCodes.OK).json(products);
        } catch (e) {
            next(e);
        }
    }

    public findById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

        try{
            const productId = req.params.id;

            const product: IProduct = await this.productDao.findById(productId);

            res.status(StatusCodes.OK).json(product);
        } catch (e) {
            next(e);
        }
    }

    public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try{
            const { ...newProduct } = req.body;

            const product: IProduct = await this.productDao.create(newProduct);

            res.status(StatusCodes.OK).json(product);
        } catch (e) {
            next(e);
        }
    }

    public update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try{
            // const { ...productToUpdate } = req.body;
            // const productId = req.params.id;
            //
            // const product: IProduct = await this.productDao.update(productId, productToUpdate);
            //
            // res.status(StatusCodes.OK).json(product);
        } catch (e) {
            next(e);
        }
    }

    public delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try{
            // const productId = req.params.id;
            //
            // await this.productDao.delete(productId);
            //
            // res.status(StatusCodes.OK);
        } catch (e) {
            next(e);
        }
    }
}

export default ProductController;