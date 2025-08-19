import { JwtPayload } from "../../domain/dto/request/jwtPayload";
import { SignInUserReq } from "../../domain/dto/request/user_sign_in_req";
import { SignInUserResponse } from "../../domain/dto/response/user_sign_in_res";
import { User } from "../../domain/entity/user";
import { IUserDb, users } from "../interface/data_access/user_db";
import { IUserLogic } from "../interface/logic/user_logic";
import { IAuthService } from "../interface/services/auth_service";

export class UserLogic implements IUserLogic{
    constructor(public userDb:IUserDb,public auth:IAuthService){}
   
    create = async (req: SignInUserReq): Promise<User>=>{
        let userExist = await this.userDb.getOne({username:req.username})

        if(userExist){throw new Error(`User with this username : ${req.username} exist`)}
        const user = new User(req.username,0,0)
        const newUser = await this.userDb.create(user);
        return newUser
        
    }
    signInUser = async(signInDTO: SignInUserReq): Promise<SignInUserResponse> => {
        const userExist = await this.userDb.getOne({username:signInDTO.username})
        if(!userExist){ throw new Error(`There is  no user with this username : ${signInDTO.username} exist`)}

        const encryptData:JwtPayload ={
            username:userExist.username,
            id:userExist.id
        }
         const timeInSec = Number(process.env.EXPIRATION_TIME) || 3600; // 1 hr

        const encryptDataUsingJWT = await this.auth.encryptDataUsingJWT(encryptData,timeInSec);
        return  {
            username:userExist.username,
            token:encryptDataUsingJWT,
            expirationInSeconds:timeInSec
        }
    }
    topPlayers=async(): Promise<users[]> =>{
       const topPlayers = await this.userDb.getTopPlayers()
       return topPlayers
    }
    loadUser=async(userId: number): Promise<User | null> =>{
        return await this.userDb.getOne({id:userId})
    }
 
}