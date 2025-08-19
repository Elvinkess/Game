import { SignInUserReq } from "../../../domain/dto/request/user_sign_in_req";
import { SignInUserResponse } from "../../../domain/dto/response/user_sign_in_res";
import { User } from "../../../domain/entity/user";
import { users } from "../data_access/user_db";

export interface IUserLogic{
    create(user:SignInUserReq):Promise<User>
    signInUser (signInDTO: SignInUserReq): Promise<SignInUserResponse>
    topPlayers():Promise<users[]>
    loadUser(userId:number):Promise<User| null>
}