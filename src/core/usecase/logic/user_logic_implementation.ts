import { JwtPayload } from "../../domain/dto/request/jwtPayload";
import {  resetReq } from "../../domain/dto/request/reset_password_req";
import { SignInUserReq } from "../../domain/dto/request/user_sign_in_req";
import { verifyPasswordReq } from "../../domain/dto/request/verify_password_req";
import { SignInUserResponse } from "../../domain/dto/response/user_sign_in_res";
import { User } from "../../domain/entity/user";
import { IUserDb } from "../interface/data_access/user_db";
import { IUserLogic } from "../interface/logic/user_logic";
import { IAuthService } from "../interface/services/auth_service";
import { IEmailService } from "../interface/services/email_service";
import { IPasswordHash } from "../interface/services/password_hash_service";
import crypto from 'crypto';

export class UserLogic implements IUserLogic{
    constructor(public userDb:IUserDb,public hashpassword:IPasswordHash,public auth:IAuthService,public emailService:IEmailService){}
    findByUsername(username: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    update(user: User): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getTopPlayers(limit: number): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
   
    create = async (user: User): Promise<User>=>{
        let userExist = await this.userDb.getOne({email:user.email})

        if(userExist){throw new Error(`User with this email : ${user.email} exist`)}
        let hashPassword = await this.hashpassword.hash(user.password,10)
        user.password = hashPassword
        let newUser = await this.userDb.create(user);
        return newUser
        
    }
    signInUser = async(signInDTO: SignInUserReq): Promise<SignInUserResponse> => {
        let userExist = await this.userDb.getOne({email:signInDTO.email})
        if(!userExist){ throw new Error(`there is  no user with this email : ${signInDTO.email} exist`)}
        let validPassword = await this.hashpassword.compare(signInDTO.password,userExist.password)
        if(!validPassword){throw new Error("Password is Incorrect")}

        let encryptData:JwtPayload ={
            name:userExist.username,
            email:userExist.email,
            id:userExist.id
        }
        let timeInSec = 3600
        let encryptDataUsingJWT = await this.auth.encryptDataUsingJWT(encryptData,timeInSec);
        return  {
            name:userExist.username,
            email: userExist.email,
            token:encryptDataUsingJWT,
            expirationInSeconds:timeInSec
        }
    }
    
    generateResetToken =(): string =>{
        return crypto.randomBytes(32).toString('hex');
    }
    
    resetpassword =async(verifyReq: resetReq): Promise<string>=> {
        let user = await  this.userDb.getOne({email:verifyReq.email});
        if(!user){throw new Error(`User with this email : ${verifyReq.email} does not exist`)}

       
       let token:string = this.generateResetToken();

       let nowInSeconds = Math.floor(Date.now() / 1000);
       let expiresIn = 10 * 60; // 10 minutes in seconds
       let expiryTime = nowInSeconds + expiresIn;
       let expireDate = new Date(expiryTime * 1000)
       console.log(expireDate)
       let emailSent =await this.emailService.sendResetPasswordEmail(verifyReq.email,token);
       if(emailSent ===  false){throw  new Error("Sorry couldn't send verifyReq token")}
       await this.userDb.update({id:user.id},{token_expiration:expireDate,reset_token:token});
       return  ("you be redirected to the  verifytoken endpoint")
    }

    verifytoken = async(token:string,verifyReq:verifyPasswordReq):Promise<string>=>{
       let user = await this.userDb.getOne({reset_token:token})
       if(!user){throw new Error("Token invalid")}
       let nowInSeconds = Math.floor(Date.now() / 1000);
       let currentDate = new Date(nowInSeconds * 1000);
       if(  user?.token_expiration! < currentDate ){throw  new Error("Token has expire")}
       
       if(verifyReq.newPassword !== verifyReq.confirmPassword){throw new Error(`Pls confirm your new pass to be the same as your comfirm verifyReq`)}
       let newPassword = await this.hashpassword.hash(verifyReq.confirmPassword,10)
       user.password=newPassword;
       user.reset_token= null;
       user.token_expiration=null;
       await this.userDb.create(user)
       return ("passowrd successfully changed");


    }
 
}