import { JwtPayload } from "../../../domain/dto/request/jwtPayload";
import { resetReq } from "../../../domain/dto/request/reset_password_req";
import { SignInUserReq } from "../../../domain/dto/request/user_sign_in_req";
import { verifyPasswordReq } from "../../../domain/dto/request/verify_password_req";
import { SignInUserResponse } from "../../../domain/dto/response/user_sign_in_res";
import { User } from "../../../domain/entity/user";

export interface IUserLogic{
    create(user:User):Promise<User>
    signInUser (signInDTO: SignInUserReq): Promise<SignInUserResponse>
    resetpassword(password:resetReq):Promise<string>
    verifytoken(token:string,password:verifyPasswordReq):Promise<string>
    //submitNewPassword(password:passwordReq,token:string):Promise<string>
}