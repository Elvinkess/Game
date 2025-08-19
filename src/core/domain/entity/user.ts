import { baseEntity } from "./base_entity";

export class User extends baseEntity{
 constructor(public username:string,public wins:number,public losses:number){
     super(0);
 }
}
