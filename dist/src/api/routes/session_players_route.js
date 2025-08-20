"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const session_player_controller_1 = require("../controllers/session_player_controller");
const programs_1 = require("../programs");
const sessionPlayersRoute = (0, express_1.Router)();
const sessionPlayersController = new session_player_controller_1.SessionPlayersController(programs_1.sessionPlayersLogic);
sessionPlayersRoute.get("/active_players/:sessionId", sessionPlayersController.getActivePlayers);
exports.default = sessionPlayersRoute;
