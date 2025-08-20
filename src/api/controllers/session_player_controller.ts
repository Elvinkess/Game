import express, { Request,Response,NextFunction } from "express"
import { ISessionPlayersLogic } from "../../core/usecase/interface/logic/session_players_logic";

export class SessionPlayersController{
    constructor(private sessionPlayersLogic:ISessionPlayersLogic){}
    getActivePlayers =  async(req : Request<{sessionId:number}, {}, {}>, res: Response, next: NextFunction)=>{
        try {
            const{sessionId}= req.params
            let user = await this.sessionPlayersLogic.getActivePlayers(sessionId);
            res.json(user);
        } catch (err) {
            res.json({error: (err as Error).message})
        }
    }
}