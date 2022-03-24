import { IShoppingCart } from "../../../models/shopping-cart.model";
import { ShoppingCartService } from "../../shopping-cart.service";

import IProduct from "../../../models/product.model";

import MemoryContainer from "../../../containers/MemoryContainer";

class ShoppingCartDaoFileImpl extends MemoryContainer implements ShoppingCartService {
    constructor() {
        super();
    }

    public async removeProduct(shoppingCartId, productId): Promise<IShoppingCart> {
        const shoppingCartToUpdate: IShoppingCart = await this.findById(shoppingCartId);

        let products: IProduct[] = shoppingCartToUpdate.products;

        shoppingCartToUpdate.products = products.filter((product: IProduct) => product.id !== productId);

        return await this.update(shoppingCartId, shoppingCartToUpdate);

    }
}

export default ShoppingCartDaoFileImpl;