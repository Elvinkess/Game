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
exports.GameSessionLogic = void 0;
const session_players_1 = require("../../domain/entity/session_players");
const game_session_1 = require("../../domain/dto/enums/game_session");
const game_session_2 = require("../../domain/entity/game_session");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class GameSessionLogic {
    constructor(userDb, gameSessionDb, playerDb, io) {
        this.userDb = userDb;
        this.gameSessionDb = gameSessionDb;
        this.playerDb = playerDb;
        this.io = io;
        this.joinSession = (userId, pickedNumber, socketId) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const user = yield this.userDb.getOne({ id: userId });
                if (!user)
                    throw new Error("User does not exist");
                // Get the active session
                let currentSession = yield this.gameSessionDb.getOne({ status: game_session_1.SessionStatus.ACTIVE });
                let activeSession;
                if (!currentSession) {
                    // No active session,create new
                    activeSession = yield this.createNewSession();
                    this.startSessionTimer(activeSession); // start countdown
                }
                else {
                    activeSession = currentSession;
                }
                // Check if user is already in this session
                const existingPlayer = yield this.playerDb.getOne({ userId, sessionId: activeSession.id });
                if (existingPlayer)
                    throw new Error(`You are already a player in this game`);
                // Check session capacity
                let date = new Date();
                const playersInSession = yield this.playerDb.get({ sessionId: activeSession.id, status: session_players_1.PlayerInSessionStatus.ACTIVE });
                const maxPlayer = parseInt((_a = process.env.MAXPLAYER) !== null && _a !== void 0 ? _a : "10", 10);
                if (playersInSession.length >= maxPlayer) {
                    const sessionPlayer = new session_players_1.SessionPlayer(userId, activeSession.id, pickedNumber, false, false, date, session_players_1.PlayerInSessionStatus.WAITINGROOM, socketId);
                    const savedPlayer = yield this.playerDb.create(sessionPlayer);
                    this.io.to(socketId).emit("max-players", { sessionId: activeSession.id, userName: user.username, pickedNumber, endsAt: activeSession.endsAt });
                    throw new Error("Game session is already full");
                }
                // Add user to session
                const owner = playersInSession.length === 0;
                const sessionPlayer = new session_players_1.SessionPlayer(userId, activeSession.id, pickedNumber, owner, false, date, session_players_1.PlayerInSessionStatus.ACTIVE, socketId);
                const savedPlayer = yield this.playerDb.create(sessionPlayer);
                // Notify all users that someone joined
                this.io.emit("session:joined", {
                    sessionId: activeSession.id,
                    userName: user.username,
                    pickedNumber,
                });
                // Send session countdown to every player connected
                const remainingTime = activeSession.endsAt.getTime() - Date.now();
                if (socketId) {
                    this.io.to(socketId).emit("session:started", {
                        sessionId: activeSession.id,
                        endsAt: activeSession.endsAt,
                        duration: remainingTime,
                    });
                }
                return savedPlayer;
            }
            catch (err) {
                console.error("Error in joinSession:", err);
                throw err;
            }
        });
        // Display active session to all users immediately they are connected
        this.getActiveSession = (socketId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const activeSession = yield this.gameSessionDb.getOne({ status: game_session_1.SessionStatus.ACTIVE });
                if (!activeSession) {
                    this.io.to(socketId).emit("no-active-session");
                    return;
                }
                const remainingTime = activeSession.endsAt.getTime() - Date.now();
                this.io.to(socketId).emit("session:started", {
                    sessionId: activeSession.id,
                    endsAt: activeSession.endsAt,
                    duration: remainingTime,
                });
            }
            catch (err) {
                console.error("Error in getActiveSession:", err);
                this.io.to(socketId).emit("error", { message: "Failed to fetch active session" });
            }
        });
        //To remove a player and add the next in Queue
        this.removePlayer = (userId, sessionId) => __awaiter(this, void 0, void 0, function* () {
            try {
                let session = yield this.gameSessionDb.getOne({ id: sessionId, status: game_session_1.SessionStatus.ACTIVE });
                if (!session) {
                    throw new Error("Session is closed or does not exist");
                }
                let player = yield this.playerDb.getOne({ userId: userId, sessionId: sessionId, status: session_players_1.PlayerInSessionStatus.ACTIVE }); //go to session and check if user is an active player
                if (!player) {
                    throw new Error("Your are not an active player in this session");
                }
                yield this.playerDb.update({ id: player.id }, { status: session_players_1.PlayerInSessionStatus.LEFTGAME }); //if yes;set user status to left game
                let newPlayer = yield this.playerDb.getOne({ sessionId: sessionId, status: session_players_1.PlayerInSessionStatus.WAITINGROOM }); //get the first person with a status of in waiting room and session id
                if (newPlayer) {
                    yield this.playerDb.update({ id: newPlayer.id }, { status: session_players_1.PlayerInSessionStatus.ACTIVE });
                    let user = yield this.userDb.getOne({ id: newPlayer.userId });
                    //emit to every one that this user joined
                    this.io.emit("session:joined", {
                        sessionId: sessionId,
                        userName: user === null || user === void 0 ? void 0 : user.username,
                        pickedNumber: newPlayer.pickedNumber,
                    });
                    //emit the count down to this specific player/sockedId
                    const remainingTime = session.endsAt.getTime() - Date.now();
                    this.io.to(newPlayer.socketId).emit("session:started", {
                        sessionId: sessionId,
                        endsAt: session.endsAt,
                        duration: remainingTime,
                    });
                }
            }
            catch (error) {
                console.error("Error in joinSession:", error);
                throw error;
            }
            //if someone is found with waitingroom status
            //update their status to active
            //emit to every one same with previous one
            //emit to this specific sockedId(this will be handled by the frontend to redired the person to the game)
        });
        this.closeSession = (sessionId, winningNumber) => __awaiter(this, void 0, void 0, function* () {
            // Get all players in this session
            const sessionPlayers = yield this.playerDb.get({ sessionId });
            if (!sessionPlayers.length)
                throw new Error("No players found in this session");
            //  Update each player's isWinner stats and user win/loss counters
            yield Promise.all(sessionPlayers.map((player) => __awaiter(this, void 0, void 0, function* () {
                const isWinner = player.pickedNumber === winningNumber;
                // Update player session record
                yield this.playerDb.update({ id: player.id }, { isWinner });
                // Update user record
                const user = yield this.userDb.getOne({ id: player.userId });
                if (user) {
                    user.wins = isWinner ? (user.wins || 0) + 1 : user.wins || 0;
                    user.losses = !isWinner ? (user.losses || 0) + 1 : user.losses || 0;
                    yield this.userDb.update({ id: user.id }, user);
                }
            })));
            //Close the session
            yield this.gameSessionDb.update({ id: sessionId }, { status: game_session_1.SessionStatus.CLOSED });
            //Prepare winner info for frontend
            const winners = sessionPlayers.filter((p) => p.pickedNumber === winningNumber);
            const winnersWithUsername = yield Promise.all(winners.map((w) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                const user = yield this.userDb.getOne({ id: w.userId });
                return {
                    username: (_a = user === null || user === void 0 ? void 0 : user.username) !== null && _a !== void 0 ? _a : "Unknown",
                    pickedNumber: w.pickedNumber,
                    isWinner: true,
                };
            })));
            const payload = {
                sessionId,
                winningNumber,
                winners: winnersWithUsername,
                players: sessionPlayers
            };
            yield this.gameSessionDb.update({ id: sessionId }, { status: game_session_1.SessionStatus.CLOSED });
            // Emit event to frontend, the show the result of the game along with players/participients
            this.io.emit("session:closed", payload);
        });
        // Time's the session to close immediately it reaches the end time,also emit the remaining time to all players participating including those yet to participate
        this.startSessionTimer = (session) => {
            const now = Date.now();
            let remaining = session.endsAt.getTime() - now;
            // Broadcast countdown every second
            const interval = setInterval(() => {
                remaining = session.endsAt.getTime() - Date.now();
                if (remaining <= 0) {
                    clearInterval(interval); // stop countdown
                    this.closeSession(session.id, Math.floor(Math.random() * 9) + 1)
                        .catch(err => console.error("Error closing session:", err));
                    return;
                }
                // Runs before the sessio closes so clients can show a live countdown clock and stay in sync with the server timer.
                this.io.emit("session:countdown", {
                    sessionId: session.id,
                    remaining, // milliseconds
                });
            }, 1000);
            // Emit initial "started" event once,immediately the session begins
            this.io.emit("session:started", {
                sessionId: session.id,
                endsAt: session.endsAt,
                duration: remaining,
            });
        };
        this.createNewSession = () => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const maxPlayer = parseInt((_a = process.env.MAXPLAYER) !== null && _a !== void 0 ? _a : "10", 10);
            const createdAt = new Date();
            // starts 30s after creation
            const startedAt = new Date(Date.now() + 10 * 1000);
            const durationSeconds = 20;
            const endsAt = new Date(startedAt.getTime() + durationSeconds * 1000);
            const newSession = new game_session_2.GameSession(game_session_1.SessionStatus.ACTIVE, maxPlayer, createdAt, startedAt, endsAt);
            return this.gameSessionDb.create(newSession);
        });
    }
}
exports.GameSessionLogic = GameSessionLogic;
