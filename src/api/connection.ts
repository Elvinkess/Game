import { DataSource } from "typeorm"
import 'reflect-metadata';
import dotenv from 'dotenv';
import { UserConfig } from "../core/infrastructure/repository/config/user_config";
import { SessionPlayerConfig } from "../core/infrastructure/repository/config/game_player";
import { GameSessionConfig } from "../core/infrastructure/repository/config/game_session";


dotenv.config();
const AppDataSource = new DataSource({
    type: "postgres",
    host: "dpg-d2i9uo3e5dus73ek9c8g-a.oregon-postgres.render.com",
    port: 5432,
    username: "gamedb_4x5c_user",
    password: process.env.PASSWORD,
    database: "gamedb_4x5c",
    entities: [UserConfig, SessionPlayerConfig, GameSessionConfig],
    synchronize: false,
    logging: false,
    ssl: {
      rejectUnauthorized: false, // Required for Render
    },
  });


AppDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
        console.log("database is connected boss")
    })
    .catch((error) => console.log(error))

export default AppDataSource;