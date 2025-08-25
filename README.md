# 🎲 Random Number Game  

A real-time multiplayer game built with **Socket.IO** where players join a session, pick a number between **1–9**, and the backend randomly selects the winning number. Whoever picked the correct number is declared the winner.  

Players must authenticate using **JWT** before joining a session.  

---

## 🚀 Features  
- 🔗 Real-time multiplayer gameplay with Socket.IO  
- 🔐 Secure authentication with JWT  
- 🕹 Players can join or leave sessions dynamically  
- 🔢 Each player picks a number (1–9)  
- 🎉 Winner is decided randomly by the server  
- 📡 Events-driven architecture with Socket.IO  

---

## ⚙️ Tech Stack   
- **Backend**: Node.js, Express, Socket.IO  
- **Frontend**: React (or any Socket.IO client)  
- **Authentication**: JWT (JSON Web Tokens)  
- **Communication**: WebSockets via Socket.IO  

---

## 📌 Game Flow  
1. User registers/login to get a JWT.  
2. Client connects to the server with the JWT.  
3. Server validates the token before allowing entry to the session.  
4. Server emits `session:started` when a round begins.  
5. Each authenticated player picks a number (1–9).  
6. Server randomly generates a winning number.  
7. If a player’s number matches, server emits `session:closed` with the winner.  
8. Number of player per session is 10,but can be modify from the .env
9. A user cannot join a session if its filled unless another player leaves, hence the first  player in the queue would join the session automatically.

---

## 🔑 Socket.IO Events  

### **Server → Client**  
- `session:started` → notifies all players a game has started. 
- `session:closed` → sends the winning number and winner details. 
- `queue:joined` → notifies when a queued player has been moved into the session. 
- `session-countdown` → emit the coundown in real time till a session cleses.
- `no-active-session` → emit when there is no active session for users to create one.




## 🖥 Installation & Setup  

### 1. Clone the repo:  
```bash
git clone https://github.com/Elvinkess/Chat-App-Backend.git
cd Chat-App-Backend
