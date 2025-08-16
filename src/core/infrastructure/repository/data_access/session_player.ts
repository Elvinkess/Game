import { DataSource } from "typeorm";
import { ISessionPlayerDb } from "../../../usecase/interface/data_access/session_player";
import { SessionPlayerConfig } from "../config/game_player";
import { BaseDb } from "./base_db";

export  class SessionPlayerDb extends BaseDb<SessionPlayerConfig> implements ISessionPlayerDb{
    
    constructor( myDataSource: DataSource) {
        super(  myDataSource, SessionPlayerConfig)
    }
    
} 