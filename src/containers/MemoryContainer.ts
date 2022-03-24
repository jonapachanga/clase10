import { AbstractPersistence } from "../services/AbstractPersistence";
import { ApiException } from "../exceptions/ApiException";

import { v4 as uuidv4 } from 'uuid';

class MemoryContainer implements AbstractPersistence {
    public objs: any[];

    constructor() {
        this.objs = [];
    }

    public async create(newObj: any): Promise<any> {
        newObj.id = uuidv4();

        this.objs.push(newObj);


        return newObj;
    }

    public async delete(id: string): Promise<void> {
        const index = this.objs.findIndex(o => o.id === id);

        if (index) throw new ApiException(404, 'Resource not found');

        this.objs.splice(index, 1);
    }

    public async findAll(): Promise<any[]> {
        return this.objs;
    }

    public async findById(id: string): Promise<any> {
        const obj = this.objs.find(p => p.id === id);

        if (!obj) throw new ApiException(404, 'Resource not found');

        return obj;
    }

    public async update(id: string, obj: any): Promise<any> {
        const index = this.objs.findIndex(o => o.id === id);

        if (index) throw new ApiException(404, 'Resource not found');

        Object.keys(obj).forEach(key => {
            this.objs[index][key] = obj[key];
        });

        return this.objs[index];
    }

}

export default MemoryContainer;