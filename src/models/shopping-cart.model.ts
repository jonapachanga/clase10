import IProduct from "./product.model";

export interface IShoppingCart {
    id?: number;
    products: IProduct[];
    createdAt: Date;
    modifiedAt: Date;
}