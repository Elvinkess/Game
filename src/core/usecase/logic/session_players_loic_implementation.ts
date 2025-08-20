import { PlayerInSessionStatus, SessionPlayer } from "../../domain/entity/session_players";
import { IGameSessionDb } from "../interface/data_access/game_session_db";
import { ISessionPlayerDb } from "../interface/data_access/session_player";
import { IUserDb } from "../interface/data_access/user_db";
import { IActivePlayers, ISessionPlayersLogic } from "../interface/logic/session_players_logic";

export class SessionPlayersLogic implements ISessionPlayersLogic{
    constructor(private userDb:IUserDb,private sesionplayersDb:ISessionPlayerDb,private sessionDb:IGameSessionDb){}
    getActivePlayers =async(sessionId: number): Promise<IActivePlayers[]>=> {


        let sessionExist = await this.sessionDb.getOne({id:sessionId});
        if(!sessionExist){throw new Error("Session does not exist");}

        const activePlayers = await this.sesionplayersDb.get({sessionId:sessionId,status:PlayerInSessionStatus.ACTIVE})
        const userIds:number[] = activePlayers.map(player =>player.userId)
        const players = await Promise.all(
            userIds.map(id => this.userDb.getOne({ id }))
        );
        return players.map(player => ({username: player?.username || "Unknown" }));

    }
   
}