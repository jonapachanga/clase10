// export class Product implements IProduct {
//     id?: number;
//     name?: string;
//     description?: string;
//     code?: string;
//     imageUrl?: string;
//     price?: number;
//     stock?: number;
// }

export default interface IProduct {
    id?: number;
    name?: string;
    description?: string;
    code?: string;
    imageUrl?: string;
    price?: number;
    stock?: number;
    createdAt: Date;
    modifiedAt: Date;
}