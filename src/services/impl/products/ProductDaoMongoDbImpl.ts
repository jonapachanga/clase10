import MongoDbContainer from "../../../containers/MongoDbContainer";
import IProduct from "../../../models/product.model";
import Product from "../../../models/productSchema";

class ProductDaoMongoDbImpl extends MongoDbContainer<IProduct>{
    constructor() {
        super(Product);
    }
}

export default ProductDaoMongoDbImpl;