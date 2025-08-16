import { DataSource } from "typeorm";
import { GameSession } from "../../../domain/entity/game_session";
import { IGameSessionDb} from "../../../usecase/interface/data_access/game_session_db";
import { GameSessionConfig } from "../config/game_session";
import { BaseDb } from "./base_db";

export  class GameSessionDb extends BaseDb<GameSessionConfig> implements IGameSessionDb{
    
    constructor( myDataSource: DataSource) {
        super(  myDataSource, GameSessionConfig)
    }
    
} 