import {PlayerService} from "./PlayerService";
import {GameRoomData} from "../types/gameRoomData";
import {TetrominosName} from "../types/tetrominos";

export class GameService {
    id: string;
    players: PlayerService[];
    status: 'waiting' | 'playing' | 'finished';
    tetrominos: TetrominosName[];
    currentPenalties: { playerId: string; playerName: string; lines: number }[] | null;

    constructor(id: string, hostPlayer: PlayerService) {
        this.id = id;
        this.players = [hostPlayer];
        this.status = 'waiting';
        this.tetrominos = this.generateTetrominos();
        this.currentPenalties = null;
    }

    private generateTetrominos(count: number = 100): TetrominosName[] {
        const allPieces = Object.values(TetrominosName);
        const randomTetrominos: TetrominosName[] = [];

        for (let i = 0; i < count; i++) {
            const randomPiece = allPieces[Math.floor(Math.random() * allPieces.length)];
            randomTetrominos.push(randomPiece);
        }

        return randomTetrominos;
    }

    addPlayer(player: PlayerService) {
        if (this.status !== 'waiting') {
            throw new Error('Cannot join game that is not in waiting status');
        }
        this.players.push(player);
    }

    removePlayer(playerId: string) {
        this.players = this.players.filter(player => player.id !== playerId);
    }

    startGame() {
        this.status = 'playing';
    }

    handlePenalty(player: PlayerService, linesCleared: number) {
        if (linesCleared >= 2) {
            const penaltyLines = 1 + (linesCleared - 2);
            if (!this.currentPenalties) {
                this.currentPenalties = [];
            }
            this.currentPenalties.push({
                playerId: player.id,
                playerName: player.name,
                lines: penaltyLines
            });
        }
    }

    toJSON(): GameRoomData {
        return {
            id: this.id,
            status: this.status,
            players: this.players.map(player => ({
                id: player.id,
                name: player.name,
                highScore: player.highScore,
                board: player.board,
                isHost: player.isHost,
                currentScore: player.currentScore
            })),
            host: this.players.find(player => player.isHost)?.name || '',
            tetrominos: this.tetrominos,
            currentPenalties: this.currentPenalties
        };
    }
}