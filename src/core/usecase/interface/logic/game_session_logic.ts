import { GameSession } from "../../../domain/entity/game_session";
import { SessionPlayer } from "../../../domain/entity/session_players";

export interface IGameSessionRepo {
  joinSession(userId: number, pickedNumber: number):Promise<SessionPlayer>
  }
  