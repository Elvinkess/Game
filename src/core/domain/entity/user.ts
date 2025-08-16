import { baseEntity } from "./base_entity";

export class User extends baseEntity{
 constructor(public username:string,public email:string,public password:string,public wins:number,public losses:number,public reset_token?: string| null,public token_expiration?:Date | null){
     super(0);
 }
}
