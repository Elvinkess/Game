import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { PlayerInSessionStatus, SessionPlayer } from "../../../domain/entity/session_players";

@Entity("game_player")
export class SessionPlayerConfig extends BaseEntity  implements SessionPlayer {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({name: "userid"})
    userId!:number

    @Column({name: "sessionid"})
    sessionId!: number

    @Column({name: "pickednumber"})
    pickedNumber!: number

    @Column({ default: false,name: "isowner" })
    isOwner!:boolean

    @Column({ default: false,name: "iswinner" })
    isWinner!:boolean

    @Column({name: "joinedat"})
    joinedAt!:Date

    @Column()
    status!:PlayerInSessionStatus

    @Column()
    socketId!:string
}