"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionPlayerDb = void 0;
const game_player_1 = require("../config/game_player");
const base_db_1 = require("./base_db");
class SessionPlayerDb extends base_db_1.BaseDb {
    constructor(myDataSource) {
        super(myDataSource, game_player_1.SessionPlayerConfig);
    }
}
exports.SessionPlayerDb = SessionPlayerDb;
