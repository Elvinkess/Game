import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../../domain/entity/user";

@Entity("users")
export class UserConfig extends BaseEntity  implements User {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    username!: string

    @Column({ default: 0 })
    wins!:number

    @Column({ default: 0 })
    losses!:number

}