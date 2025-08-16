import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { GameSession } from "../../../domain/entity/game_session";
import { SessionStatus } from "../../../domain/dto/enums/game_session";

@Entity("game_session")
export class GameSessionConfig extends BaseEntity  implements GameSession {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ default: SessionStatus.PENDING })
    status!: SessionStatus

    @Column()
    capacity!: number

    @Column()
    createdAt!: Date

    @Column({ nullable: true })
    startedAt!:Date | null

    @Column({ nullable: true })
    endsAt!:Date | null

    @Column({ nullable: true })
    winningNumber!:number | null

}