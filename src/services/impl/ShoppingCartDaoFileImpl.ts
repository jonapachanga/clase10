import FileContainer from "../../containers/FileContainer";
import { IShoppingCart } from "../../models/shopping-cart.model";
import IProduct from "../../models/product.model";
import { ShoppingCartService } from "../shopping-cart.service";

class ShoppingCartDaoFileImpl extends FileContainer implements ShoppingCartService {
    constructor() {
        super('db/shopping_cart.json');
    }

    public async removeProduct(shoppingCartId, productId): Promise<IShoppingCart> {
        const shoppingCartToUpdate: IShoppingCart = await this.findById(shoppingCartId);

        let products: IProduct[] = shoppingCartToUpdate.products;

        shoppingCartToUpdate.products = products.filter((product: IProduct) => product.id !== productId);

        return await this.update(shoppingCartId, shoppingCartToUpdate);

    }
}

export default ShoppingCartDaoFileImpl;