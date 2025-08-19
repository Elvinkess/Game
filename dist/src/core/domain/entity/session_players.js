"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionPlayer = exports.PlayerInSessionStatus = void 0;
const base_entity_1 = require("./base_entity");
var PlayerInSessionStatus;
(function (PlayerInSessionStatus) {
    PlayerInSessionStatus["ACTIVE"] = "active";
    PlayerInSessionStatus["LEFTGAME"] = "left_game";
    PlayerInSessionStatus["WAITINGROOM"] = "waiting_room";
    PlayerInSessionStatus["GAMEOVER"] = "game_over";
})(PlayerInSessionStatus || (exports.PlayerInSessionStatus = PlayerInSessionStatus = {}));
class SessionPlayer extends base_entity_1.baseEntity {
    constructor(userId, sessionId, pickedNumber, isOwner, isWinner = false, joinedAt = new Date(), status = PlayerInSessionStatus.ACTIVE, socketId) {
        super(0);
        this.userId = userId;
        this.sessionId = sessionId;
        this.pickedNumber = pickedNumber;
        this.isOwner = isOwner;
        this.isWinner = isWinner;
        this.joinedAt = joinedAt;
        this.status = status;
        this.socketId = socketId;
    }
}
exports.SessionPlayer = SessionPlayer;
