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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameSessionLogic = void 0;
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_route_1 = __importDefault(require("./src/api/routes/user_route"));
const programs_1 = require("./src/api/programs");
const game_session_logic_implementation_1 = require("./src/core/usecase/logic/game_session_logic_implementation");
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, { cors: { origin: "*" } });
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/user", user_route_1.default);
exports.gameSessionLogic = new game_session_logic_implementation_1.GameSessionLogic(programs_1.userDb, programs_1.gameSessionDb, programs_1.sessionPlayerDb, io);
// Socket Entry Connection
io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);
    // Join or start a game session
    socket.on("join-session", (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId, pickedNumber }) {
        try {
            yield exports.gameSessionLogic.joinSession(userId, pickedNumber, socket.id);
        }
        catch (err) {
            socket.emit("session:error", err.message);
        }
    }));
    socket.on("get-active-session", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield exports.gameSessionLogic.getActiveSession(socket.id);
        }
        catch (err) {
            socket.emit("session:error", "Failed to fetch active session");
        }
    }));
    socket.on("player-left", (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId, sessionId }) {
        try {
            yield exports.gameSessionLogic.removePlayer(userId, sessionId);
        }
        catch (error) {
            console.log(error);
        }
    }));
    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });
});
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
