import { SessionPlayer } from "../../../domain/entity/session_players";
export interface IActivePlayers{
    username:string
}
export interface ISessionPlayersLogic {
    getActivePlayers(sessionId: number):Promise<IActivePlayers[]>
}