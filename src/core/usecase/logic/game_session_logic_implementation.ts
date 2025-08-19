import { IGameSessionDb } from "../interface/data_access/game_session_db";
import { ISessionPlayerDb } from "../interface/data_access/session_player";
import { Server } from "socket.io";
import { IGameSessionLogic } from "../interface/logic/game_session_logic";
import { PlayerInSessionStatus, SessionPlayer } from "../../domain/entity/session_players";
import { SessionStatus } from "../../domain/dto/enums/game_session";
import { GameSession } from "../../domain/entity/game_session";
import dotenv from 'dotenv';
import { IUserDb } from "../interface/data_access/user_db";
dotenv.config();

export class GameSessionLogic implements  IGameSessionLogic {
    constructor( private userDb:IUserDb,private gameSessionDb: IGameSessionDb,private playerDb: ISessionPlayerDb, private io: Server ) {}
    
    joinSession = async(userId: number, pickedNumber: number, socketId?: string): Promise<SessionPlayer> => {
        try {
            console.log(`${userId} picked number ${pickedNumber}`);
    
            const user = await this.userDb.getOne({ id: userId });
            if (!user) throw new Error("User does not exist");
    
            // Get the active session
            let currentSession = await this.gameSessionDb.getOne({ status: SessionStatus.ACTIVE });
            let activeSession: GameSession;
    
            if (!currentSession) {
                // No active session,create new
                activeSession = await this.createNewSession();
                this.startSessionTimer(activeSession); // start countdown
            } else {
                activeSession = currentSession;
            }
    
            // Check if user is already in this session
            const existingPlayer = await this.playerDb.getOne({ userId, sessionId: activeSession.id });
            if (existingPlayer) throw new Error(`You are already a player in this game`);
    
            // Check session capacity
            let date = new Date()
            const playersInSession = await this.playerDb.get({ sessionId: activeSession.id,status:PlayerInSessionStatus.ACTIVE });
            const maxPlayer = parseInt(process.env.MAXPLAYER ?? "10", 10);
            if (playersInSession.length >= maxPlayer) {
                const sessionPlayer = new SessionPlayer(userId, activeSession.id, pickedNumber, false,false,date,PlayerInSessionStatus.WAITINGROOM,socketId!);
                const savedPlayer = await this.playerDb.create(sessionPlayer);
               this.io.to(socketId!).emit("max-players",{sessionId: activeSession.id, userName: user.username, pickedNumber, endsAt: activeSession.endsAt})
                throw new Error("Game session is already full");
            }
    
            // Add user to session
            const owner = playersInSession.length === 0;
            const sessionPlayer = new SessionPlayer(userId, activeSession.id, pickedNumber,owner,false,date,PlayerInSessionStatus.ACTIVE,socketId!);
            const savedPlayer = await this.playerDb.create(sessionPlayer);
    
    
            // Notify all users that someone joined
            this.io.emit("session:joined", {
                sessionId: activeSession.id,
                userName: user.username,
                pickedNumber,
            });
    
            // Send session countdown to every player connected
            const remainingTime = activeSession.endsAt!.getTime() - Date.now();
            if (socketId) {
                this.io.to(socketId).emit("session:started", {
                    sessionId: activeSession.id,
                    endsAt: activeSession.endsAt,
                    duration: remainingTime,
                });
            }
    
            return savedPlayer;
    
        } catch (err) {
            console.error("Error in joinSession:", err);
            throw err;
        }
    };
    // Display active session to all users immediately they are connected
    getActiveSession = async (socketId: string):Promise<void> =>{
        try {
            const activeSession = await this.gameSessionDb.getOne({ status: SessionStatus.ACTIVE });
            if (!activeSession) {
                this.io.to(socketId).emit("no-active-session");
                return;
            }
    
            const remainingTime = activeSession.endsAt!.getTime() - Date.now();
    
            this.io.to(socketId).emit("session:started", {
                sessionId: activeSession.id,
                endsAt: activeSession.endsAt,
                duration: remainingTime,
            });
        } catch (err) {
            console.error("Error in getActiveSession:", err);
            this.io.to(socketId).emit("error", { message: "Failed to fetch active session" });
        }
    }

    //To remove a player and add the next in Queue
    removePlayer = async(userId:number,sessionId:number):Promise<void>=>{
        try {

            let session = await this.gameSessionDb.getOne({id:sessionId,status:SessionStatus.ACTIVE})
            if(!session){throw new Error("Session is closed or does not exist")}
            let player = await this.playerDb.getOne({userId:userId,sessionId:sessionId,status:PlayerInSessionStatus.ACTIVE})//go to session and check if user is an active player
            if(!player){throw new Error("Your are not an active player in this session")}
            await this.playerDb.update({id:player.id},{status:PlayerInSessionStatus.LEFTGAME})  //if yes;set user status to left game
            let newPlayer = await this.playerDb.getOne({sessionId:sessionId,status:PlayerInSessionStatus.WAITINGROOM})//get the first person with a status of in waiting room and session id
            console.log({session,userId,player,sessionId})
            if(newPlayer){
                await this.playerDb.update({id:newPlayer.id},{status:PlayerInSessionStatus.ACTIVE})
                let user= await this.userDb.getOne({id:newPlayer.userId})
    
                //emit to every one that this user joined
                this.io.emit("session:joined", {
                    sessionId: sessionId,
                    userName: user?.username,
                    pickedNumber:newPlayer.pickedNumber,
                });
                //emit the count down to this specific player/sockedId
                const remainingTime = session.endsAt!.getTime() - Date.now();
                this.io.to(newPlayer.socketId).emit("session:started", {
                    sessionId: sessionId,
                    endsAt: session.endsAt,
                    duration: remainingTime,
                })
            }
            
        } catch (error) {
            console.error("Error in joinSession:", error);
            throw error;
            
        }
 
        //if someone is found with waitingroom status
        //update their status to active
        //emit to every one same with previous one
        //emit to this specific sockedId(this will be handled by the frontend to redired the person to the game)

        
    }
    
  
    private closeSession = async (sessionId: number, winningNumber: number) => {
        // Get all players in this session
        const sessionPlayers = await this.playerDb.get({ sessionId });
        if (!sessionPlayers.length) throw new Error("No players found in this session");
      
        //  Update each player's isWinner stats and user win/loss counters
        await Promise.all(
          sessionPlayers.map(async (player) => {
            const isWinner = player.pickedNumber === winningNumber;
      
            // Update player session record
            await this.playerDb.update({ id: player.id }, { isWinner });
      
            // Update user record
            const user = await this.userDb.getOne({ id: player.userId });
            if (user) {
              user.wins = isWinner ? (user.wins || 0) + 1 : user.wins || 0;
              user.losses = !isWinner ? (user.losses || 0) + 1 : user.losses || 0;
              await this.userDb.update({ id: user.id }, user);
            }
          })
        );
      
        //Close the session
        await this.gameSessionDb.update({ id: sessionId }, { status: SessionStatus.CLOSED });
      
        //Prepare winner info for frontend
        const winners = sessionPlayers.filter((p) => p.pickedNumber === winningNumber);
        const winnersWithUsername = await Promise.all(
          winners.map(async (w) => {
            const user = await this.userDb.getOne({ id: w.userId });
            return {
              username: user?.username ?? "Unknown",
              pickedNumber: w.pickedNumber,
              isWinner: true,
            
            };
          })
        );
      
        const payload = {
          sessionId,
          winningNumber,
          winners: winnersWithUsername,
          players:sessionPlayers
        };
        await this.gameSessionDb.update({id:sessionId},{status:SessionStatus.CLOSED})
        console.log(payload);
      
        // Emit event to frontend, the show the result of the game along with players/participients
        this.io.emit("session:closed", payload);
      };
      
      // Time's the session to close immediately it reaches the end time,also emit the remaining time to all players participating including those yet to participate
    private startSessionTimer =(session: GameSession) =>{
        const now = Date.now();
        let remaining = session.endsAt!.getTime() - now;
    
        // Broadcast countdown every second
        const interval = setInterval(() => {
            remaining = session.endsAt!.getTime() - Date.now();
    
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
    }
    

    private  createNewSession = async(): Promise<GameSession> => {
        const maxPlayer = parseInt(process.env.MAXPLAYER ?? "10", 10);
        const createdAt = new Date();
      
        // starts 30s after creation
        const startedAt = new Date(Date.now() + 10 * 1000);
      
        const durationSeconds = 20
        const endsAt = new Date(startedAt.getTime() + durationSeconds * 1000);
      
        const newSession = new GameSession(
          SessionStatus.ACTIVE,
          maxPlayer,
          createdAt,
          startedAt,
          endsAt
        );
      
        return this.gameSessionDb.create(newSession);
      }
      
}

