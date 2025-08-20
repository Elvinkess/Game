"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionPlayersLogic = void 0;
const session_players_1 = require("../../domain/entity/session_players");
class SessionPlayersLogic {
    constructor(userDb, sesionplayersDb, sessionDb) {
        this.userDb = userDb;
        this.sesionplayersDb = sesionplayersDb;
        this.sessionDb = sessionDb;
        this.getActivePlayers = (sessionId) => __awaiter(this, void 0, void 0, function* () {
            let sessionExist = yield this.sessionDb.getOne({ id: sessionId });
            if (!sessionExist) {
                throw new Error("Session does not exist");
            }
            const activePlayers = yield this.sesionplayersDb.get({ sessionId: sessionId, status: session_players_1.PlayerInSessionStatus.ACTIVE });
            const userIds = activePlayers.map(player => player.userId);
            const players = yield Promise.all(userIds.map(id => this.userDb.getOne({ id })));
            return players.map(player => ({ username: (player === null || player === void 0 ? void 0 : player.username) || "Unknown" }));
        });
    }
}
exports.SessionPlayersLogic = SessionPlayersLogic;
