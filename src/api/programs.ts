import { GameSessionDb } from "../core/infrastructure/repository/data_access/game_session_db";
import { SessionPlayerDb } from "../core/infrastructure/repository/data_access/session_player_db";
import { UserDb } from "../core/infrastructure/repository/data_access/user_db";
import { AuthService } from "../core/infrastructure/service/auth_service";
import { IGameSessionDb } from "../core/usecase/interface/data_access/game_session_db";
import { ISessionPlayerDb } from "../core/usecase/interface/data_access/session_player";
import { IUserDb } from "../core/usecase/interface/data_access/user_db";
import { ISessionPlayersLogic } from "../core/usecase/interface/logic/session_players_logic";
import { IUserLogic } from "../core/usecase/interface/logic/user_logic";
import { IAuthService } from "../core/usecase/interface/services/auth_service";
import { SessionPlayersLogic } from "../core/usecase/logic/session_players_loic_implementation";
import { UserLogic } from "../core/usecase/logic/user_logic_implementation";
import AppDataSource from "./connection";
import { AuthMiddleware } from "./middlewares/auth_middleware";

export const userDb: IUserDb = new UserDb(AppDataSource);
export const gameSessionDb:IGameSessionDb = new GameSessionDb(AppDataSource)
export const sessionPlayerDb:ISessionPlayerDb= new SessionPlayerDb(AppDataSource)

export const auth:IAuthService = new AuthService()
export const authMiddleware=new AuthMiddleware(auth)

export  const userLogic: IUserLogic = new UserLogic(userDb,auth);
export const sessionPlayersLogic:ISessionPlayersLogic = new SessionPlayersLogic(userDb,sessionPlayerDb,gameSessionDb)
