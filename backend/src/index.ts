// src/index.ts
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { Server } from "socket.io";
import type { Server as HTTPServer } from "node:http";
import { readFile } from 'fs/promises'
import { PlayerService } from './Services/PlayerService';
import { GameService } from './Services/GameService';
import { v4 as uuidv4 } from 'uuid';
import { cors } from 'hono/cors'
import {Board} from "./types/board";

const app = new Hono()

app.use(
    '*',
    cors({
      origin: 'http://localhost:3001',
      // allowHeaders: ['X-Custom-Header', 'Upgrade-Insecure-Requests'],
      allowMethods: ['POST', 'GET', 'OPTIONS'],
      exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
      maxAge: 600,
      credentials: true,
    })
)

app.get('/', async (c) => {
  const html = await readFile('./public/index.html', 'utf-8')
  return c.html(html)
})

app.get('/create-game', async (c) => {
  return c.json(createGame(c.req.query('playerName'), c.req.query('playerId')))
})

app.get('games', async (c) => {
    return c.json(getGames())
})

const httpServer = serve({
  fetch: app.fetch,
  port: 3000,
});

const io = new Server(httpServer as HTTPServer, {
  cors: {
    origin: "*", // Adjust this in production
    methods: ["GET", "POST"]
  }
});

// GameService rooms storage
const gameRooms = new Map<string, GameService>();

const createGame = (playerName: string, playerId: string) => {
    const gameId = uuidv4();
    const hostPlayer = new PlayerService(playerId, playerName, true);
    const newGame = new GameService(gameId, hostPlayer);

    gameRooms.set(gameId, newGame);

    return newGame.toJSON()
}

const getGames = () => {
    return Array.from(gameRooms.values()).map(game => game.toJSON())
}

const getGame = (gameId: string) => {
    return gameRooms.get(gameId)
}

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // // Create a new game room
  // socket.value.on('create-game', (playerName: string) => {
  //   const gameId = uuidv4();
  //   const hostPlayer = new PlayerService(socket.id, playerName, true);
  //   const newGame = new GameService(gameId, hostPlayer);
  //
  //   gameRooms.set(gameId, newGame);
  //   socket.join(gameId);
  //
  //   io.to(gameId).emit('game-updated', newGame.toJSON());
  // });

  // Join an existing game room
  socket.on('join-game', (gameId: string, playerName: string, playerId: string, highScore: number) => {
    const game = gameRooms.get(gameId);
    if (!game) {
      socket.emit('error', 'GameService room not found');
      return;
    }

    const newPlayer = new PlayerService(playerId, playerName, false, highScore);
    try {
      if (!game.players.find(p => p.id === playerId)) {
        game.addPlayer(newPlayer);
      }
      socket.join(gameId);

      io.to(gameId).emit('game-updated', game.toJSON());
    } catch (error) {
      socket.emit('error', error instanceof Error ? error.message : 'Failed to join game');
    }
  });

  // Start the game
  socket.on('start-game', (gameId: string, playerId: string) => {
    const game = gameRooms.get(gameId);
    if (!game) {
      socket.emit('error', 'GameService room not found');
      return;
    }

    console.log('start game');
    // Ensure only the host can start the game
    const player = game.players.find(p => p.id === playerId);
    if (!player?.isHost) {
      socket.emit('error', 'Only the host can start the game');
      return;
    }

    try {
      game.startGame();
      io.to(gameId).emit('game-started', game.toJSON());
    } catch (error) {
      socket.emit('error', error instanceof Error ? error.message : 'Failed to start game');
    }
  });

  interface GameState {
    score: number;
    board: Board[],
  }
  // Handle game updates
  socket.on('game-update', (gameId: string, playerId: string, gameState: GameState) => {
    console.log("GAME UPDATE BACK !");
    console.log('gameId : ', gameId, 'gameState : ', gameState.score)
    const game = gameRooms.get(gameId);
    if (!game) return;

    const index = game.players.findIndex(p => p.id === playerId);
    if (!game.players[index]) return;

    game.players[index].updateBoard(gameState.board);
    game.players[index].updateScore(gameState.score);
    console.log("GAME", game.toJSON());
    socket.to(gameId).emit('game-update', game.toJSON());
  });

  socket.on('info-game', (gameId: string, playerId: string) => {
    const game = gameRooms.get(gameId);
    if (!game) {
        socket.emit('error', 'Game not found');
        return;
    }

    const player = game.players.find(p => p.id === playerId);
    if (!player) {
        socket.emit('error', 'Player not found in game');
        return;
    }
    socket.emit('info-game', game.toJSON());
  })

  // Handle line clearing and penalty
  socket.on('clear-lines', (gameId: string, playerId: string, linesCleared: number) => {
    const game = gameRooms.get(gameId);
    if (!game) return;

    const player = game.players.find(p => p.id === playerId);
    if (!player) return;

    game.handlePenalty(player, linesCleared);

    // Broadcast penalty to all players except the one who cleared lines
    socket.to(gameId).emit('apply-penalty', game.currentPenalties[game.currentPenalties.length - 1]);
  });

  socket.on('disconnect', () => {
    // Remove player from all games
    // @ts-ignore
    for (const [gameId, game] of gameRooms.entries()) {
      const playerIndex = game.players.findIndex(p => p.id === socket.id);
      if (playerIndex !== -1) {
        game.removePlayer(socket.id);

        // If no players left, remove the game
        if (game.players.length === 0) {
          gameRooms.delete(gameId);
        } else {
          // If host disconnects, assign new host
          if (!game.players.some(p => p.isHost)) {
            game.players[0].isHost = true;
          }

          io.to(gameId).emit('game-updated', game.toJSON());
        }
      }
    }
  });
});

console.log('Server running on http://localhost:3000');