import { baseEntity } from "./base_entity";
export enum PlayerInSessionStatus{
  ACTIVE= "active",
  LEFTGAME="left_game",
  WAITINGROOM="waiting_room",
  GAMEOVER="game_over"
}
export class SessionPlayer  extends baseEntity {
    constructor(
      public userId: number,
      public sessionId: number,
      public pickedNumber: number,
      public isOwner: boolean,
      public isWinner: boolean = false,
      public joinedAt: Date = new Date(),
      public status:PlayerInSessionStatus= PlayerInSessionStatus.ACTIVE,
      public socketId:string
    ) {super(0);}
  }
  