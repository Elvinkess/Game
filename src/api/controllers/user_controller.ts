import { JwtPayload } from "../../core/domain/dto/request/jwtPayload";
import { SignInUserReq } from "../../core/domain/dto/request/user_sign_in_req";
import { IUserLogic } from "../../core/usecase/interface/logic/user_logic";
import express, { Request,Response,NextFunction } from "express"

export class UserController{
    constructor(private userLogic:IUserLogic){}
    create =  async(req : Request<{}, {}, SignInUserReq>, res: Response, next: NextFunction)=>{
        try {
            let user = await this.userLogic.create(req.body);
            res.json(user);
        } catch (err) {
            res.json({error: (err as Error).message})
        }
    }
    signin =  async(req : Request<{}, {}, SignInUserReq>, res: Response, next: NextFunction)=>{
        try {
            let user = await this.userLogic.signInUser(req.body);
            res.json(user);
        } catch (err) {
            res.json({error: (err as Error).message})
        }
    }
    topUsers  = async(req : Request<{}, {}, {}>, res: Response, next: NextFunction)=>{
        try {
            let users = await this.userLogic.topPlayers();
            res.json(users);
        } catch (err) {
            res.json({error: (err as Error).message})
        }
    }
    loadUser  = async(req : Request<{}, {}, {}>, res: Response, next: NextFunction)=>{
        try {
            let userPayload = res.locals.user as JwtPayload
            let users = await this.userLogic.loadUser(userPayload.id);
            res.json(users);
        } catch (err) {
            res.json({error: (err as Error).message})
        }
    }
}