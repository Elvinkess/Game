import { GameSession } from "../../../domain/entity/game_session";
import { SessionPlayer } from "../../../domain/entity/session_players";

export interface IGameSessionLogic {
  joinSession(userId: number, pickedNumber: number):Promise<SessionPlayer>
  removePlayer(userId:number,sessionId:number):Promise<void>
  getActiveSession (socketId: string):Promise<void>
  }
  