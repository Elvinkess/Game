import { SessionPlayer } from "../../entity/session_players"

export interface IClosedPayload{
    sessionId: number,
    winningNumber:number
    winners:[]
}