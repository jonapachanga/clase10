import { model, Schema } from "mongoose";
import IProduct from "./product.model";

const ProductSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    description: { type: String, required: false },
    code: { type: String, required: false },
    imageUrl: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: false },
    createdAt: { type: Date, required: false },
    modifiedAt: { type: Date, required: false },
})

const Product = model<IProduct>('Product', ProductSchema);

export default Product;