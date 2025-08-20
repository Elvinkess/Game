import { Router } from "express";
import { SessionPlayersController } from "../controllers/session_player_controller";
import { sessionPlayersLogic } from "../programs";

const sessionPlayersRoute = Router();
const  sessionPlayersController = new SessionPlayersController(sessionPlayersLogic)
sessionPlayersRoute.get("/active_players/:sessionId",sessionPlayersController.getActivePlayers)

export default sessionPlayersRoute;