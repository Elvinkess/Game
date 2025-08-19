"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameSession = void 0;
const base_entity_1 = require("./base_entity");
class GameSession extends base_entity_1.baseEntity {
    constructor(status, maxPlayers, createdAt, startedAt = null, endsAt = null, winningNumber = null) {
        super(0);
        this.status = status;
        this.maxPlayers = maxPlayers;
        this.createdAt = createdAt;
        this.startedAt = startedAt;
        this.endsAt = endsAt;
        this.winningNumber = winningNumber;
    }
}
exports.GameSession = GameSession;
