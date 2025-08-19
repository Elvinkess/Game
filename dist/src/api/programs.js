"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogic = exports.authMiddleware = exports.auth = exports.sessionPlayerDb = exports.gameSessionDb = exports.userDb = void 0;
const game_session_db_1 = require("../core/infrastructure/repository/data_access/game_session_db");
const session_player_db_1 = require("../core/infrastructure/repository/data_access/session_player_db");
const user_db_1 = require("../core/infrastructure/repository/data_access/user_db");
const auth_service_1 = require("../core/infrastructure/service/auth_service");
const user_logic_implementation_1 = require("../core/usecase/logic/user_logic_implementation");
const connection_1 = __importDefault(require("./connection"));
const auth_middleware_1 = require("./middlewares/auth_middleware");
exports.userDb = new user_db_1.UserDb(connection_1.default);
exports.gameSessionDb = new game_session_db_1.GameSessionDb(connection_1.default);
exports.sessionPlayerDb = new session_player_db_1.SessionPlayerDb(connection_1.default);
exports.auth = new auth_service_1.AuthService();
exports.authMiddleware = new auth_middleware_1.AuthMiddleware(exports.auth);
exports.userLogic = new user_logic_implementation_1.UserLogic(exports.userDb, exports.auth);
