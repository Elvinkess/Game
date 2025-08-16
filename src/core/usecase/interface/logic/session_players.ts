import { SessionPlayer } from "../../../domain/entity/session_players";

export interface ISessionParticipantRepo {
  add(participant: SessionPlayer): Promise<SessionPlayer>;
  update(participant: SessionPlayer): Promise<void>;
  countInSession(sessionId: string): Promise<number>;
  findBySessionAndUser(sessionId: string, userId: string): Promise<SessionPlayer | null>;
  listBySession(sessionId: string): Promise<SessionPlayer[]>;
  }
  