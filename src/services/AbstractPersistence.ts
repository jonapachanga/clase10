export interface AbstractPersistence {

    findAll(): Promise<any>;
    findById(id: string): Promise<any>
    create(obj: any): Promise<any>
    update(id: string, obj: any): Promise<any>
    delete(id: string): Promise<void>
}