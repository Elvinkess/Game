import { Repository } from "typeorm/repository/Repository";
import {  BaseEntity, DataSource, EntityTarget, ILike, In, LessThan, LessThanOrEqual, Like, MoreThan, MoreThanOrEqual, ObjectLiteral } from "typeorm";
import { IBaseDb } from "../../../usecase/interface/data_access/base_db";


export class BaseDb<TEntity extends BaseEntity> implements IBaseDb<TEntity>{
    protected model: Repository<TEntity>
    
    constructor( myDataSource: DataSource, entity: EntityTarget<TEntity>){
        this.model = myDataSource.getRepository(entity)
    }
   
    async getAll(): Promise<TEntity[]> {
        return await this.model.find()
    }
    get = async (query: Partial<{ [key in keyof TEntity]: any; }>): Promise<TEntity[]> => {
        return await this.model.findBy(query);
    }

    getOne = async (query: Partial<{ [key in keyof TEntity]: any; }>): Promise<TEntity | null> => {
        return await this.model.findOneBy(query);
    }
    create = async (entity: TEntity): Promise<TEntity> => {
        const savedentity = await this.model.save(entity);
        return savedentity;
    }
    
    remove = async (query: Partial<{ [key in keyof TEntity]: any; }>): Promise<TEntity> => {
        const removeEnt = await this.model.findBy(query);
        await this.model.delete(query);
        return removeEnt[0]
    }
    update = async (query:Partial<{[key in keyof TEntity]:any}>,keyToUpdate:Partial<{[key in keyof TEntity]:any}>) : Promise<TEntity | null>=>{
       
          await this.model.update(query,keyToUpdate)
          return await this.model.findOneBy(query);
    }
}