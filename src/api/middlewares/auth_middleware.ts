import { Request,Response,NextFunction } from "express";
import { IAuthService } from "../../core/usecase/interface/services/auth_service";

interface AuthRequest extends Request {
    user?: {username: string,id:number}
}


export class AuthMiddleware{
    constructor(public auth:IAuthService){}    
     authenticateJWT = async (req: AuthRequest, res: Response, next: NextFunction) :Promise<any> => {
      let token = req.header("Authorization")?.split(" ")[1];
    
      if (!token) {
        return res.status(401).json({ message: "Access token is missing" });
      }
    
      try {
        const decoded = this.auth.decodedjwt(token);
        res.locals.user= decoded
        next();
      } catch (err) {
        res.status(403).json({ message: "Invalid token" });
      }
    };
}