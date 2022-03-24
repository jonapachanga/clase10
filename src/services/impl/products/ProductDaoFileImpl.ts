import FileContainer from "../../../containers/FileContainer";

class ProductDaoFileImpl extends FileContainer {
    constructor() {
        super('db/products.json');
    }

}

export default ProductDaoFileImpl;