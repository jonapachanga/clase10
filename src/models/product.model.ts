import { Document } from 'mongoose';

export default interface IProduct extends Document {
    id?: number;
    name?: string;
    description?: string;
    code?: string;
    imageUrl?: string;
    price?: number;
    stock?: number;
    createdAt?: Date;
    modifiedAt?: Date;
}