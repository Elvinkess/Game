import { Router } from "express";
import { authMiddleware, userLogic } from "../programs";
import { UserController } from "../controllers/user_controller";
import { Validator } from "../middlewares/field_validator";



let userRoute = Router();
let validator = new Validator()
let userController = new UserController(userLogic)
userRoute.post("/create",validator.signValidation,validator.validate, userController.create)
userRoute.post("/signin", userController.signin)
userRoute.get("/top-players",userController.topUsers)
userRoute.get("/get_user",authMiddleware.authenticateJWT,userController.loadUser)


export default userRoute;