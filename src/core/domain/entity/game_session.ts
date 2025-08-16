import { SessionStatus } from "../dto/enums/game_session";
import { baseEntity } from "./base_entity";

export class GameSession extends baseEntity {
  constructor(
    public status: SessionStatus,
    public capacity: number,
    public createdAt: Date,
    public startedAt: Date | null = null,
    public endsAt: Date | null = null,
    public winningNumber: number | null = null
  ) {super(0)}
}
