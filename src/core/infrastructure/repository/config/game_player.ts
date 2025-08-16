import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { SessionPlayer } from "../../../domain/entity/session_players";

@Entity("game_player")
export class SessionPlayerConfig extends BaseEntity  implements SessionPlayer {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    userId!:number

    @Column()
    sessionId!: number

    @Column()
    pickedNumber!: number

    @Column({ default: false })
    isOwner!:boolean

    @Column({ default: false })
    isWinner!:boolean

    @Column()
    joinedAt!:Date

}