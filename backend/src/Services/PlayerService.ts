import { Board } from '../types/board';

export class PlayerService {
    id: string;
    name: string;
    board: Board[];
    currentScore: number;
    highScore: number;
    isHost: boolean;

    constructor(id: string, name: string, isHost: boolean = false) {
        this.id = id;
        this.name = name;
        this.board = null;
        this.currentScore = 0;
        this.highScore = 0;
        this.isHost = isHost;
    }

    updateScore(points: number) {
        this.currentScore += points;
        this.highScore = Math.max(this.currentScore, this.highScore);
    }

    updateBoard(boards: Board[]) {
        this.board = boards;
    }
}