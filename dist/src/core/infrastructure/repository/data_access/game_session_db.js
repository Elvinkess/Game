"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameSessionDb = void 0;
const game_session_1 = require("../config/game_session");
const base_db_1 = require("./base_db");
class GameSessionDb extends base_db_1.BaseDb {
    constructor(myDataSource) {
        super(myDataSource, game_session_1.GameSessionConfig);
    }
}
exports.GameSessionDb = GameSessionDb;
