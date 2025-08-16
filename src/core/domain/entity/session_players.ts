import { baseEntity } from "./base_entity";

export class SessionPlayer  extends baseEntity {
    constructor(
      public userId: number,
      public sessionId: number,
      public pickedNumber: number,
      public isOwner: boolean,
      public isWinner: boolean = false,
      public joinedAt: Date = new Date()
    ) {super(0);}
  }
  