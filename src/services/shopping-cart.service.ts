import { IShoppingCart } from "../models/shopping-cart.model";

export interface ShoppingCartService {
    removeProduct(shoppingCartId, productId): Promise<IShoppingCart>;
}