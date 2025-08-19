CREATE TABLE game_player (
  id SERIAL PRIMARY KEY,
  userId INT NOT NULL,
  sessionId INT NOT NULL,
  pickedNumber INT NOT NULL,
  isOwner BOOLEAN NOT NULL DEFAULT false,
  isWinner BOOLEAN NOT NULL DEFAULT false,
  joinedAt TIMESTAMP NOT NULL DEFAULT now()
)