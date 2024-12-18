import { Board } from '../types/board';

export class PlayerService {
    id: string;
    name: string;
    board: Board[];
    currentScore: number;
    highScore: number;
    isHost: boolean;

    constructor(id: string, name: string, isHost: boolean = false, highScore: number = 0) {
        this.id = id;
        this.name = name;
        this.board = [];
        this.currentScore = 0;
        this.highScore = highScore;
        this.isHost = isHost;
    }

    updateScore(points: number) {
        this.currentScore += points;
        this.highScore = Math.max(this.currentScore, this.highScore);
    }

    updateBoard(boards: Board[]) {
        this.board = boards;
        // console.log('updateBoard', this.board);
    }
}