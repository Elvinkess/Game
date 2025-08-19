"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
require("reflect-metadata");
const dotenv_1 = __importDefault(require("dotenv"));
const user_config_1 = require("../core/infrastructure/repository/config/user_config");
const game_player_1 = require("../core/infrastructure/repository/config/game_player");
const game_session_1 = require("../core/infrastructure/repository/config/game_session");
dotenv_1.default.config();
const AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "dpg-d2i9uo3e5dus73ek9c8g-a.oregon-postgres.render.com",
    port: 5432,
    username: "gamedb_4x5c_user",
    password: process.env.PASSWORD,
    database: "gamedb_4x5c",
    entities: [user_config_1.UserConfig, game_player_1.SessionPlayerConfig, game_session_1.GameSessionConfig],
    synchronize: false,
    logging: false,
    ssl: {
        rejectUnauthorized: false, // Required for Render
    },
});
AppDataSource.initialize()
    .then(() => {
    // here you can start to work with your database
    console.log("database is connected boss");
})
    .catch((error) => console.log(error));
exports.default = AppDataSource;
