import { promises as fs, readFileSync } from 'fs';
import { ApiException } from "../exceptions/ApiException";
import { AbstractPersistence } from "../services/AbstractPersistence";
import { v4 as uuidv4 } from 'uuid';

class FileContainer implements AbstractPersistence {
    public path: string;
    public objs: any[];

    constructor(path: string) {
        this.path = `src/${path}`;

        const objsLoad = this._readFile();
        this.objs = (!! objsLoad) ? JSON.parse(objsLoad) : [];

    }

    public async findAll(): Promise<any[]> {
        return this.objs;
    }

    public async findById(id: string): Promise<any> {

        const obj = this.objs.find(p => p.id === id);

        if (!obj) throw new ApiException(404, 'Resource not found');

        return obj;
    }

    public async create(newObj: any): Promise<any> {

        newObj.id = uuidv4();

        this.objs.push(newObj);

        await this._writeFile();

        return newObj;
    }

    public async delete(id: string): Promise<void> {

        const index = this.objs.findIndex(o => o.id === id);

        if (index) throw new ApiException(404, 'Resource not found');

        this.objs.splice(index, 1);

        await this._writeFile();
    }

    public async update(id: string, obj: any): Promise<any> {

        const index = this.objs.findIndex(o => o.id === id);

        if (index) throw new ApiException(404, 'Resource not found');

        Object.keys(obj).forEach(key => {
            this.objs[index][key] = obj[key];
        });

        await this._writeFile();

        return this.objs[index];
    }

    private _readFile(): string {
        try {
            return readFileSync(this.path, {encoding: 'utf8', flag: 'r'});
        } catch (e) {
            throw new ApiException(500, 'Error to read file');
        }
    }

    private async _writeFile() {
        try {
            await fs.writeFile(this.path, JSON.stringify(this.objs));
        } catch (e) {
            throw new ApiException(500, 'Error to write file');
        }
    }
}

export default FileContainer;