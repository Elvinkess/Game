import  express from "express"
import { Server } from "socket.io";
import http from "http";
import  cors from "cors"
import dotenv from 'dotenv';
import userRoute from "./src/api/routes/user_route";
import { gameSessionDb, sessionPlayerDb, userDb } from "./src/api/programs";
import { GameSessionLogic } from "./src/core/usecase/logic/game_session_logic_implementation";
dotenv.config();



const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const port = process.env.PORT || 3000;


app.use(express.json());
app.use(cors());
app.use("/user", userRoute)

export const gameSessionLogic = new GameSessionLogic(userDb, gameSessionDb, sessionPlayerDb, io);
// Socket Entry Connection
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  // Join or start a game session
  socket.on("join-session", async ({ userId, pickedNumber }) => {
    try {
      await gameSessionLogic.joinSession(userId, pickedNumber,socket.id);
    } catch (err: any) {
      socket.emit("session:error", err.message);
    }
  });

  socket.on("get-active-session", async () => {
    try {
      await gameSessionLogic.getActiveSession(socket.id);
    } catch (err: any) {
      socket.emit("session:error", "Failed to fetch active session");
    }
  });
  socket.on("player-left",async({userId,sessionId})=>{
    try {
      await gameSessionLogic.removePlayer(userId,sessionId)
    } catch (error) {
      console.log(error)
    }
  })
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
  
  
});



server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

