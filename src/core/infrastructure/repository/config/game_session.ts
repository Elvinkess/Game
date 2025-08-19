import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { GameSession } from "../../../domain/entity/game_session";
import { SessionStatus } from "../../../domain/dto/enums/game_session";

@Entity("game_session")
export class GameSessionConfig extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "enum", enum: SessionStatus, default: SessionStatus.PENDING })
  status!: SessionStatus;

  @Column({ name: "maxplayers" })
  maxPlayers!: number;

  @Column({ type: "timestamp",name: "createdat", default: () => "now()" })
  createdAt!: Date;

  @Column({ type: "timestamp",name: "startedat", nullable: true })
  startedAt!: Date | null;

  @Column({ type: "timestamp",name: "endsat", nullable: true })
  endsAt!: Date | null;

  @Column({ type: "int", name: "winningnumber",nullable: true })
  winningNumber!: number | null;
}
