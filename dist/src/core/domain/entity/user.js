"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const base_entity_1 = require("./base_entity");
class User extends base_entity_1.baseEntity {
    constructor(username, wins, losses) {
        super(0);
        this.username = username;
        this.wins = wins;
        this.losses = losses;
    }
}
exports.User = User;
