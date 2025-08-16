import { GameSession } from "../../../domain/entity/game_session";
import { IBaseDb } from "./base_db";

export interface IGameSessionDb extends IBaseDb<GameSession> {
   
  }