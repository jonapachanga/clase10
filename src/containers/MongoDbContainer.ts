import { Document, Model } from 'mongoose'

abstract class MongoDbContainer<T extends Document> {
    private readonly model: Model<T>;

    protected constructor(model: Model<T>) {
        this.model = model;
    }

    public async create(newObj: T): Promise<T> {

        return await this.model.create(newObj);
    }

    // delete(id: string): Promise<void> {
    //     return Promise.resolve(undefined);
    // }
    //
    public async findAll(): Promise<T[]> {
        return await this.model.find({});
    }

    public async findById(id: string) {
        return this.model.findById(id);
    }

    // update(id: string, obj: any): Promise<any> {
    //     return Promise.resolve(undefined);
    // }

}

export default MongoDbContainer;