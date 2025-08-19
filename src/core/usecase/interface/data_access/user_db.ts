import { User } from "../../../domain/entity/user";
import { UserConfig } from "../../../infrastructure/repository/config/user_config";
import { IBaseDb } from "./base_db";

export interface users{
    username:string
    wins:number
}
export interface IUserDb extends IBaseDb<User>{
    getTopPlayers(limit?: number): Promise<users[]>;
   
}