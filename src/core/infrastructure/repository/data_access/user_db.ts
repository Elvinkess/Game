import { DataSource } from "typeorm";
import { IUserDb, users } from "../../../usecase/interface/data_access/user_db";
import { UserConfig } from "../config/user_config";
import { BaseDb } from "./base_db";

export  class UserDb extends BaseDb<UserConfig> implements IUserDb{
    
    constructor( myDataSource: DataSource) {
        super(  myDataSource, UserConfig)
    }
    getTopPlayers= async(limit: number = 10): Promise<users[]> =>{
        return this.model.find({
         select: ["username", "wins"],
          order: { wins: "DESC" }, // order by wins descending
          take: limit,             // limit to top 10
        });
      }
} 