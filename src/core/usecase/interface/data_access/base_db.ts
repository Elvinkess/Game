export interface IBaseDb<TEntity> {
    get (query: Partial<{[key in keyof TEntity]: any}>): Promise<TEntity[]>;
    create(entity: TEntity): Promise<TEntity>
    getOne (query: Partial<{ [key in keyof TEntity]: any; }>): Promise<TEntity | null>
    update  (query:Partial<{[key in keyof TEntity]:any}>,keyToUpdate:Partial<{[key in keyof TEntity]:any}>) : Promise<TEntity | null>
    remove (query: Partial<{[key in keyof TEntity]: any}>): Promise<TEntity>;
}