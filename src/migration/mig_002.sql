CREATE TYPE session_status AS ENUM ('PENDING', 'ACTIVE', 'CLOSED');

CREATE TABLE game_session (
  id SERIAL PRIMARY KEY,
  status session_status NOT NULL DEFAULT 'PENDING',
  maxPlayers INT NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT now(),
  startedAt TIMESTAMP NULL,
  endsAt TIMESTAMP NULL,
  winningNumber INT NULL
);
