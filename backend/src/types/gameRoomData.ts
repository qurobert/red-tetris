import {PlayerData} from "./playerData";
import {TetrominosName} from "./tetrominos";

export interface GameRoomData {
    id: string;
    status: 'waiting' | 'playing' | 'finished';
    players: PlayerData[];
    host: string;
    tetrominos: TetrominosName[];
    currentPenalties?: {
        playerId: string;
        lines: number;
    }[] | null;
}